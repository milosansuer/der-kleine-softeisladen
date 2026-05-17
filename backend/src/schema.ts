import { getDb } from './db';
import bcrypt from 'bcryptjs';

export async function initDb() {
  const pool = getDb();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL,
      type TEXT NOT NULL,
      is_available INTEGER DEFAULT 1,
      is_highlight INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // Initialize announcement setting
  const bannerExists = await pool.query("SELECT * FROM settings WHERE key = 'announcement'");
  if (bannerExists.rows.length === 0) {
    await pool.query("INSERT INTO settings (key, value) VALUES ('announcement', '')");
  }

  // Create default admin if not exists
  const adminResult = await pool.query('SELECT * FROM users WHERE username = $1', ['admin']);
  if (adminResult.rows.length === 0) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', ['admin', passwordHash]);
    console.log('Default admin created: admin / admin123');
  }

  // Seed initial products if empty
  const productsCount = await pool.query('SELECT COUNT(*) as count FROM products');
  if (parseInt(productsCount.rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO products (name, description, price, type, is_available) VALUES 
      ('Vanille-Klassiker', 'Cremiges Vanille-Softeis nach Traditionsrezept', 2.00, 'icecream', 1),
      ('Schoko-Traum', 'Zartbitter-Schokolade, besonders cremig', 2.00, 'icecream', 1),
      ('Mix (Vanille & Schoko)', 'Das Beste aus beiden Welten', 2.20, 'icecream', 1),
      ('Erdbeere (Saisonal)', 'Fruchtiges Erdbeer-Softeis', 2.50, 'icecream', 1),
      ('Waffeltüte (Klein)', 'Knusprige kleine Waffel', 0.00, 'waffle', 1),
      ('Waffeltüte (Mittel)', 'Die klassische Größe', 0.50, 'waffle', 1),
      ('Waffeltüte (Groß)', 'Für den großen Hunger', 1.00, 'waffle', 1),
      ('Schokostreusel', 'Klassische dunkle Schokostreusel', 0.30, 'topping', 1),
      ('Bunte Streusel', 'Der Klassiker für Kinder', 0.30, 'topping', 1),
      ('Warme Kirschen', 'Fruchtiges Topping für Genießer', 0.80, 'topping', 1),
      ('Sahne', 'Frisch geschlagene Sahne', 0.50, 'topping', 1)
    `);
    console.log('Initial products seeded');
  }
}
