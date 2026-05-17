import { getDb } from './db';
import bcrypt from 'bcryptjs';

export async function initDb() {
  const db = await getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL,
      type TEXT NOT NULL, -- 'icecream', 'waffle', 'topping'
      is_available INTEGER DEFAULT 1
    );
  `);

  // Create default admin if not exists
  const adminExists = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);
  if (!adminExists) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', ['admin', passwordHash]);
    console.log('Default admin created: admin / admin123');
  }

  // Seed initial products if empty
  const productsCount = await db.get('SELECT COUNT(*) as count FROM products');
  if (productsCount.count === 0) {
    await db.run(`
      INSERT INTO products (name, description, price, type, is_available) VALUES 
      ('Vanille', 'Klassisches Vanille-Softeis', 2.50, 'icecream', 1),
      ('Schokolade', 'Zartbitter-Schokolade', 2.50, 'icecream', 1),
      ('Waffel klein', 'Klassische Waffel', 0.50, 'waffle', 1),
      ('Waffel groß', 'Knusprige große Waffel', 1.00, 'waffle', 1),
      ('Streusel', 'Bunte Zuckerstreusel', 0.30, 'topping', 1)
    `);
    console.log('Initial products seeded');
  }
}
