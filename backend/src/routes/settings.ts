import { Router } from 'express';
import { getDb } from '../db';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public: Get all settings
router.get('/', async (req, res) => {
  try {
    const pool = getDb();
    const result = await pool.query('SELECT * FROM settings');
    const settings = result.rows.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Protected: Update a setting
router.put('/:key', authenticateToken, async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  try {
    const pool = getDb();
    await pool.query(
      'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
      [key, value]
    );
    res.json({ key, value });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

export default router;
