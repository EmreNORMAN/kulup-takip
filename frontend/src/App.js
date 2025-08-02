import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MalzemeEkle from './components/MalzemeEkle';
import MalzemeDuzenle from './components/MalzemeDuzenle';
import MalzemeListesi from './components/MalzemeListesi';
import logo from './assets/koudak-logo.png';

function AnaSayfa() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>KOÜDAK</h1>
          <h2 style={styles.subTitle}>Malzeme Takip Sistemi</h2>
        </div>
        <div style={styles.buttonContainer}>
          <Link to="/malzeme-ekle" style={styles.button}>➕ Malzeme Ekle / Güncelle</Link>
          <Link to="/liste" style={styles.button}>📋 Malzeme Listesi</Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/malzeme-ekle" element={<>
          <MalzemeEkle />
          <MalzemeDuzenle />
        </>} />
        <Route path="/liste" element={<MalzemeListesi />} />
      </Routes>
    </Router>
  );
}

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    backgroundImage: `url(${logo})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 0
  },
  content: {
    zIndex: 1
  },
  header: {
    marginBottom: '50px',
  },
  mainTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  subTitle: {
    fontSize: '24px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: '#ffffffaa',
    color: '#000',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: '0.3s',
  }
};

export default App;
