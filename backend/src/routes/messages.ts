import { Router } from 'express';
import { getDb } from '../db';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public: Send a message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const pool = getDb();
    await pool.query(
      'INSERT INTO messages (name, email, message, created_at) VALUES ($1, $2, $3, NOW())',
      [name, email, message]
    );
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Failed to save message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Protected: Get all messages
router.get('/', authenticateToken, async (req, res) => {
  try {
    const pool = getDb();
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Protected: Delete a message
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = getDb();
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;
