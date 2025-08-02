import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MalzemeListesi() {
  const [malzemeler, setMalzemeler] = useState([]);
  const [sifre, setSifre] = useState('');
  const [silMesaj, setSilMesaj] = useState('');

  const listeyiYukle = async () => {
    try {
      const res = await axios.get('http://localhost:5000/malzemeler');
      setMalzemeler(res.data);
    } catch (err) {
      console.error('Liste alınamadı:', err);
    }
  };

  useEffect(() => {
    listeyiYukle();
  }, []);

  const listeyiSil = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/malzemeler?sifre=${sifre}`);
      setSilMesaj(res.data.message);
      setMalzemeler([]); // Listeyi temizle
    } catch (err) {
      setSilMesaj(err.response?.data?.error || '❌ Silme işlemi başarısız.');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Mevcut Malzemeler</h2>
      {malzemeler.length === 0 ? (
        <p>Hiç malzeme yok.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Malzeme Adı</th>
              <th style={thStyle}>Adet</th>
              <th style={thStyle}>Görsel</th>
            </tr>
          </thead>
          <tbody>
            {malzemeler.map((m, i) => (
              <tr key={i}>
                <td style={tdStyle}>{m.ad}</td>
                <td style={tdStyle}>{m.adet}</td>
                <td style={tdStyle}>
                  {m.gorselUrl ? (
                    <img src={m.gorselUrl} alt="görsel" style={{ maxWidth: '80px' }} />
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: '30px' }}>
        <h4>Listeyi Tamamen Sil (Admin)</h4>
        <input
          type="password"
          placeholder="Şifre girin"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={listeyiSil}>Listeyi Sil</button>
        {silMesaj && <p style={{ marginTop: '10px' }}>{silMesaj}</p>}
      </div>
    </div>
  );
}

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: '#f4f4f4'
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '10px'
};

export default MalzemeListesi;
