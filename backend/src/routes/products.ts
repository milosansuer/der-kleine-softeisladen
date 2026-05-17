import { Router } from 'express';
import { getDb } from '../db';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public: Get all products
router.get('/', async (req, res) => {
  try {
    const pool = getDb();
    const result = await pool.query('SELECT * FROM products ORDER BY type, name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Protected: Create a product
router.post('/', authenticateToken, async (req, res) => {
  const { name, description, price, type, is_available } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: 'Name and type are required' });
  }

  try {
    const pool = getDb();
    const result = await pool.query(
      'INSERT INTO products (name, description, price, type, is_available) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, description, price, type, is_available !== undefined ? is_available : 1]
    );
    res.status(201).json({ id: result.rows[0].id, name, description, price, type, is_available });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Protected: Update a product
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, type, is_available } = req.body;

  try {
    const pool = getDb();
    await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, type = $4, is_available = $5 WHERE id = $6',
      [name, description, price, type, is_available, id]
    );
    res.json({ id, name, description, price, type, is_available });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Protected: Delete a product
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const pool = getDb();
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
