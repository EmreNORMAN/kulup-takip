// src/components/MalzemeYonetimi.js
import React from 'react';
import MalzemeEkle from './MalzemeEkle';
import MalzemeDuzenle from './MalzemeDuzenle';

function MalzemeYonetimi() {
  return (
    <div>
      <div style={styles.card}>
        <MalzemeEkle />
      </div>
      <div style={styles.card}>
        <MalzemeDuzenle />
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  }
};

export default MalzemeYonetimi;
