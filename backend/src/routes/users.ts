import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../db';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Protected: Create a new user (admin)
router.post('/invite', authenticateToken, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const db = await getDb();
    const passwordHash = await bcrypt.hash(password, 10);
    
    await db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash]);
    res.status(201).json({ message: 'User created successfully', username });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Protected: Get current user info
router.get('/me', authenticateToken, (req: any, res) => {
  res.json(req.user);
});

export default router;
