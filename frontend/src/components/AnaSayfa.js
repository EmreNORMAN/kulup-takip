// src/components/AnaSayfa.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AnaSayfa() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>🎒 Kocaeli Üni. Dağcılık Kulübü Takip Sistemi</h2>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate('/yonetim')}>Malzeme Yönetimi</button>
        <button style={styles.button} onClick={() => navigate('/liste')}>Malzeme Listesi</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '100px',
    fontFamily: 'Arial'
  },
  buttonContainer: {
    marginTop: '40px'
  },
  button: {
    margin: '0 20px',
    padding: '15px 30px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    transition: '0.3s'
  }
};

export default AnaSayfa;
