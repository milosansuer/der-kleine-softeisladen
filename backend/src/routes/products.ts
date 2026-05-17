import { Router } from 'express';
import { getDb } from '../db';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public: Get all products
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const products = await db.all('SELECT * FROM products ORDER BY type, name');
    res.json(products);
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
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO products (name, description, price, type, is_available) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, type, is_available !== undefined ? is_available : 1]
    );
    res.status(201).json({ id: result.lastID, name, description, price, type, is_available });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Protected: Update a product
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, type, is_available } = req.body;

  try {
    const db = await getDb();
    await db.run(
      'UPDATE products SET name = ?, description = ?, price = ?, type = ?, is_available = ? WHERE id = ?',
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
    const db = await getDb();
    await db.run('DELETE FROM products WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
