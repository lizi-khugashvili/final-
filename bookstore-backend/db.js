const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;

async function initDB() {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      genre TEXT,
      inStock INTEGER DEFAULT 1,
      coverEmoji TEXT DEFAULT '📘',
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT NOT NULL,
      customerEmail TEXT,
      customerPhone TEXT,
      totalPrice REAL NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER NOT NULL,
      bookId INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      unitPrice REAL NOT NULL,
      FOREIGN KEY(orderId) REFERENCES orders(id),
      FOREIGN KEY(bookId) REFERENCES books(id)
    )
  `);

  console.log("SQLite database connected");

  return db;
}

function getDB() {
  if (!db) {
    throw new Error("Database is not initialized yet");
  }
  return db;
}

module.exports = {
  initDB,
  getDB
};