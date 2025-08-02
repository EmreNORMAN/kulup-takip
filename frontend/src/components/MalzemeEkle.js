import React, { useState } from 'react';
import axios from 'axios';

// Malzeme listesi (alfabetik sıralı)
const malzemeSecenekleri = [
  "4X4 Bot",
  "8'li İniş Aleti",
  "ATC",
  "Benzin Ocak",
  "Benzin Tüpü",
  "Bivak",
  "Çadır (Husky_Bizon)",
  "Çadır (Husky_Baron)",
  "Çadır (Evolite)",
  "Çekiç",
  "Deadman",
  "Ekspres",
  "Friction",
  "GriGri",
  "GriGri+",
  "İlk Yardım Çantası",
  "İp (50m)",
  "İp (60m)",
  "İp (70m)",
  "İp (80m)",
  "İp Dağıtıcı Plaka",
  "Kar Küreği",
  "Karabina + HMS(Hasarlı)",
  "Kask",
  "Kemer",
  "Klasik Kazma",
  "Kong Slyde Lanyard",
  "Krampon",
  "Manuel Kar Kazığı",
  "NutKey",
  "Ocak Başı",
  "Ocak Seti",
  "Perlon",
  "Reverso",
  "Sikke",
  "Slackline",
  "Sırt Çantası",
  "Takoz",
  "Telsiz",
  "Teknik Kazma",
  "Toz Torbası",
  "Uyku Tulumu",
  "Yaylı Takoz (Friend)"
];

function MalzemeEkle() {
  const [ad, setAd] = useState('');
  const [adet, setAdet] = useState('');
  const [gorselUrl, setGorselUrl] = useState('');
  const [sonuc, setSonuc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ad) {
      setSonuc("⚠️ Lütfen bir malzeme seçin.");
      return;
    }

    try {
      const response = await axios.post('/malzeme', {
        ad,
        adet: parseInt(adet),
        gorselUrl
      });

      setSonuc(`✅ Malzeme eklendi: ${response.data.ad} (${response.data.adet} adet)`);
      setAd('');
      setAdet('');
      setGorselUrl('');
} catch (error) {
  if (error.response && error.response.data && error.response.data.error) {
    setSonuc(`❌ ${error.response.data.error}`);
  } else {
    setSonuc('❌ Beklenmeyen bir hata oluştu.');
  }
}
  };

  return (
    <div>
      <h2>Malzeme Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Malzeme Seç:</label><br />
          <select value={ad} onChange={(e) => setAd(e.target.value)} required>
            <option value="">-- Malzeme Seçin --</option>
            {malzemeSecenekleri.map((secenek, i) => (
              <option key={i} value={secenek}>{secenek}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Adet:</label><br />
          <input type="number" value={adet} onChange={(e) => setAdet(e.target.value)} required />
        </div>
        <div>
          <label>Görsel Linki (isteğe bağlı):</label><br />
          <input type="text" value={gorselUrl} onChange={(e) => setGorselUrl(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Ekle</button>
      </form>
      {sonuc && <p style={{ marginTop: '20px' }}>{sonuc}</p>}
    </div>
  );
}

export default MalzemeEkle;
