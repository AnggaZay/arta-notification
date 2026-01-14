'use client';
import { useState } from 'react';

export default function Home() {
  const [pesan, setPesan] = useState('');
  const [status, setStatus] = useState('');

  const kirimWA = async () => {
    if (!pesan) return alert("Isi pesannya dulu, Bos!");
    setStatus('⌛ Mengirim...');

    try {
      const res = await fetch('/api/send-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: pesan }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('✅ Notif WA Berhasil Masuk!');
        setPesan('');
      } else {
        setStatus('❌ Gagal: ' + data.log);
      }
    } catch (err) {
      setStatus('❌ Error Koneksi ke API');
    }
  };

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '15px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Arta Notification 🚀</h2>
        <textarea 
          placeholder="Tulis pesan tes di sini..."
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: 'none', marginBottom: '1rem', backgroundColor: '#333', color: '#fff' }}
        />
        <button 
          onClick={kirimWA}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#00ff88', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Kirim Sekarang
        </button>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: status.includes('✅') ? '#00ff88' : '#ff4444' }}>{status}</p>
      </div>
    </main>
  );
}