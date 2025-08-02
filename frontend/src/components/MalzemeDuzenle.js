import React, { useState } from 'react';
import axios from 'axios';

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

function MalzemeDuzenle() {
  const [secilen, setSecilen] = useState('');
  const [yeniAdet, setYeniAdet] = useState('');
  const [mesaj, setMesaj] = useState('');

  const handleGuncelle = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/malzeme/${secilen}`, {
        yeniAdet: parseInt(yeniAdet)
      });

      setMesaj(response.data.message || '✔️ Güncelleme başarılı.');
    } catch (error) {
      if (error.response?.data?.error) {
        setMesaj(`❌ ${error.response.data.error}`);
      } else {
        setMesaj('❌ Bir hata oluştu.');
      }
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Malzeme Adedi Düzelt</h2>
      <form onSubmit={handleGuncelle}>
        <label>Malzeme Seç:</label><br />
        <select value={secilen} onChange={(e) => setSecilen(e.target.value)} required>
          <option value="">-- Malzeme Seçin --</option>
          {malzemeSecenekleri.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select><br /><br />

        <label>Yeni Adet:</label><br />
        <input type="number" value={yeniAdet} onChange={(e) => setYeniAdet(e.target.value)} required /><br /><br />

        <button type="submit">Güncelle</button>
      </form>
      {mesaj && <p style={{ marginTop: '20px' }}>{mesaj}</p>}
    </div>
  );
}

export default MalzemeDuzenle;
