const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'veritabani.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Veritabanına bağlanılamadı:', err.message);
  } else {
    console.log('Veritabanı bağlantısı başarılı!');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS malzemeler (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ad TEXT NOT NULL,
      adet INTEGER NOT NULL,
      gorselUrl TEXT
    )
  `);
});

module.exports = db;
