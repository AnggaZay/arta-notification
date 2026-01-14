'use client';
import { useState } from 'react';

export default function ArtaCreative() {
  const [pesan, setPesan] = useState('');
  const [status, setStatus] = useState('');

  const kirimNotif = async () => {
    if (!pesan) return alert("Tulis pesan dulu, Ngga!");
    setStatus('⌛ Mengirim...');
    try {
      const res = await fetch('/api/send-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Request Kreatif Baru: ${pesan}` }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('✅ Notif terkirim ke Tim Kreatif!');
        setPesan('');
      } else { setStatus('❌ Gagal kirim'); }
    } catch (err) { setStatus('❌ Error API'); }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-green-500">
      {/* --- HERO SECTION --- */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 border-b border-zinc-800">
        <h1 className="text-6xl font-black mb-4 tracking-tighter italic">ARTA CREATIVE</h1>
        <p className="text-zinc-400 max-w-lg">Digital engine of BPR Arta Utama. Kami bukan cuma desain gambar, kami bangun sistem.</p>
        <div className="mt-8 flex gap-4">
          <a href="#projek" className="bg-white text-black px-6 py-2 rounded-full font-bold">Cek Projek</a>
          <a href="#contact" className="border border-white px-6 py-2 rounded-full">Hubungi Kami</a>
        </div>
      </section>

      {/* --- PROJEK (ON-GOING) --- */}
      <section id="projek" className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-green-500"># Current Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-zinc-800 p-6 rounded-2xl bg-zinc-900/50">
            <span className="text-xs bg-green-500 text-black px-2 py-1 rounded-full font-bold">DEVELOPMENT</span>
            <h3 className="text-xl font-bold mt-4">Tabakery Hub</h3>
            <p className="text-zinc-400 mt-2 text-sm">Sistem manajemen terintegrasi untuk bisnis toast Arta. Sedang optimasi modul pembayaran.</p>
          </div>
          <div className="border border-zinc-800 p-6 rounded-2xl bg-zinc-900/50">
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-bold">BUILDING</span>
            <h3 className="text-xl font-bold mt-4">RekaHub</h3>
            <p className="text-zinc-400 mt-2 text-sm">Control hub untuk seluruh ekosistem bisnis digital kami. Fokus pada landing page utama.</p>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO (RESULTS) --- */}
      <section id="portfolio" className="py-20 bg-zinc-950 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Portfolio Showcase</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Lu tinggal ganti src gambarnya nanti */}
            <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center text-zinc-500 italic text-xs border border-zinc-700">Content Instagram BPR</div>
            <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center text-zinc-500 italic text-xs border border-zinc-700">Branding Arta Utama</div>
            <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center text-zinc-500 italic text-xs border border-zinc-700">UI/UX Design Projects</div>
          </div>
        </div>
      </section>

      {/* --- ABOUT US --- */}
      <section className="py-20 px-8 max-w-4xl mx-auto text-center border-t border-zinc-800">
        <h2 className="text-3xl font-bold mb-6">The Dynamic Duo</h2>
        <p className="text-zinc-400 leading-relaxed">
          Arta Creative adalah tim kecil dengan impian besar di BPR Arta Utama. Cuma ada dua orang di balik layar, 
          tapi kami menghandle semuanya mulai dari konten harian sampai sistem backend yang kompleks.
        </p>
      </section>

      {/* --- CONTACT (WA NOTIF) --- */}
      <section id="contact" className="py-20 px-8 bg-green-500 text-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Butuh Bantuan Kreatif?</h2>
          <p className="mb-8 font-medium">Tulis pesanmu, tim kami akan langsung dapet notif WA!</p>
          <textarea 
            className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-black bg-white text-black mb-4 h-32"
            placeholder="Contoh: Ngga, tolong buatin desain buat promo deposito dong..."
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
          />
          <button 
            onClick={kirimNotif}
            className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Kirim Request via WA
          </button>
          <p className="mt-4 text-sm font-bold italic">{status}</p>
        </div>
      </section>
    </div>
  );
}