const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./veritabani');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.send('Sunucu çalışıyor! 🚀');
});

app.post('/malzeme', (req, res) => {
  const { ad, adet, gorselUrl } = req.body;

  if (!ad || adet === undefined || adet === null) {
    return res.status(400).json({ error: 'Malzeme adı ve adedi zorunludur.' });
  }

  const kontrolSQL = `SELECT * FROM malzemeler WHERE ad = ?`;
  db.get(kontrolSQL, [ad], (err, row) => {
    if (err) {
      console.error('Veritabanı sorgu hatası:', err.message);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }

    if (row) {
      return res.status(400).json({ error: 'Bu malzeme zaten ekli. Aynı isimle tekrar eklenemez.' });
    }

    const ekleSQL = `INSERT INTO malzemeler (ad, adet, gorselUrl) VALUES (?, ?, ?)`;
    db.run(ekleSQL, [ad, adet, gorselUrl], function (err) {
      if (err) {
        console.error('Veritabanı yazma hatası:', err.message);
        return res.status(500).json({ error: 'Malzeme eklenemedi.' });
      }

      res.status(201).json({
        id: this.lastID,
        ad,
        adet,
        gorselUrl
      });
    });
  });
});

app.get('/malzemeler', (req, res) => {
  const sql = `SELECT * FROM malzemeler ORDER BY id DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Malzeme verileri alınamadı:', err.message);
      return res.status(500).json({ error: 'Veri alınamadı' });
    }
    res.json(rows);
  });
});

app.delete('/malzemeler', (req, res) => {
  const sifre = req.query.sifre;

  if (sifre !== 'EmreNorman') {
    return res.status(403).json({ error: '❌ Şifre hatalı. Silme işlemi reddedildi.' });
  }

  const sql = `DELETE FROM malzemeler`;
  db.run(sql, [], function (err) {
    if (err) {
      console.error('Silme hatası:', err.message);
      return res.status(500).json({ error: 'Veriler silinemedi.' });
    }

    res.json({ message: '✅ Tüm malzemeler başarıyla silindi.' });
  });
});

// ✅ YENİ: Malzeme adedini güncelleme rotası
app.put('/malzeme/:ad', (req, res) => {
  const ad = req.params.ad;
  const { yeniAdet } = req.body;

  if (yeniAdet === undefined || yeniAdet === null || isNaN(yeniAdet)) {
    return res.status(400).json({ error: 'Geçerli bir adet değeri girilmelidir.' });
  }

  const sql = `UPDATE malzemeler SET adet = ? WHERE ad = ?`;
  db.run(sql, [yeniAdet, ad], function (err) {
    if (err) {
      console.error('Veritabanı güncelleme hatası:', err.message);
      return res.status(500).json({ error: 'Adet güncellenemedi.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Bu isimde bir malzeme bulunamadı.' });
    }

    res.json({ message: `✅ ${ad} güncellendi. Yeni adet: ${yeniAdet}` });
  });
});

app.get('/malzemeler-html', (req, res) => {
  const sql = `SELECT * FROM malzemeler ORDER BY id DESC`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('HTML görünümü alınamadı:', err.message);
      return res.status(500).send('Veri alınamadı.');
    }

    let html = `
      <html>
        <head>
          <title>Malzeme Listesi</title>
          <style>
            body { font-family: Arial; padding: 40px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background-color: #f4f4f4; }
            img { max-width: 100px; }
          </style>
        </head>
        <body>
          <h2>Mevcut Malzemeler</h2>
          <table>
            <tr>
              <th>Malzeme Adı</th>
              <th>Adet</th>
              <th>Görsel</th>
            </tr>`;

    rows.forEach(m => {
      html += `
        <tr>
          <td>${m.ad}</td>
          <td>${m.adet}</td>
          <td>${m.gorselUrl ? `<img src="${m.gorselUrl}" alt="Görsel">` : '—'}</td>
        </tr>`;
    });

    html += `
          </table>
        </body>
      </html>`;

    res.send(html);
  });
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
