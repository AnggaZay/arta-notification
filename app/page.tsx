'use client';
import { useState } from 'react';

export default function ArtaCreative() {
  const [pesan, setPesan] = useState('');
  const [status, setStatus] = useState('');

  const kirimNotif = async () => {
    if (!pesan) return alert("Please enter your message first.");
    setStatus('⌛ Syncing...');
    try {
      const res = await fetch('/api/send-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `New Tech Request: ${pesan}` }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('✅ Synced to Team.');
        setPesan('');
      } else { setStatus('❌ Failed.'); }
    } catch (err) { setStatus('❌ Error.'); }
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-slate-100 z-50 px-5 md:px-8 py-4 flex justify-between items-center">
        <div className="font-black text-lg md:text-xl tracking-tighter text-[#054fa0]">
          ARTA<span className="text-red-600">.</span>CREATIVE
        </div>
        <div className="flex gap-2 md:gap-3">
          {/* LINK INTERNAL ADMIN */}
          <a href="/laporan" className="border border-slate-200 text-slate-500 px-4 py-2 rounded-full text-[10px] md:text-sm font-bold hover:bg-slate-50 transition-all">
            Admin
          </a>
          <a href="#contact" className="bg-[#054fa0] text-white px-4 py-2 rounded-full text-[10px] md:text-sm font-bold hover:bg-yellow-400 hover:text-[#054fa0] transition-all">
            Contact
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 text-center">
        <div className="inline-block px-3 py-1 mb-6 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase bg-blue-50 text-[#054fa0] rounded-full border border-blue-100">
          Official Creative Hub of BPR Arta Utama
        </div>
        <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tight text-slate-950 leading-[1.1]">
          Membangun Karakter <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#054fa0] to-blue-500 italic">Lewat Visual</span>.
        </h1>
        <p className="text-sm md:text-xl text-slate-500 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
          Fokus pada progres kreatif dan menjaga karakter merk melalui visual, komunikasi dan feedback terhadap nasabah.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 px-4">
          <a href="#projek" className="bg-[#054fa0] text-white px-8 py-4 rounded-2xl font-bold text-base md:text-lg shadow-lg shadow-blue-900/20 active:scale-95 transition-all text-center">Lihat Proyek</a>
          <a href="#portfolio" className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold text-base md:text-lg active:scale-95 transition-all text-center">Portfolio</a>
        </div>
      </section>

      {/* --- PROJEK (ACTIVE STACKS) --- */}
      <section id="projek" className="py-16 md:py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-slate-50">
        <div className="mb-10 md:mb-16">
          <h2 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2 italic">Active Stacks</h2>
          <p className="text-3xl md:text-5xl font-black tracking-tight text-[#054fa0]">Proyek Aktif</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="group p-8 md:p-10 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-[#054fa0] transition-all shadow-sm">
            <div className="w-10 h-10 bg-[#054fa0] rounded-xl mb-6 flex items-center justify-center text-white font-bold italic text-sm">S</div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">Sosial Media</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-6 italic">"Menjaga tampilan merk BPR Arta Utama agar tetap relevan dan berkarakter."</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-[#054fa0]">Creator</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-[#054fa0]">Designer</span>
            </div>
          </div>
          <div className="group p-8 md:p-10 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-red-600 transition-all shadow-sm">
            <div className="w-10 h-10 bg-red-600 rounded-xl mb-6 flex items-center justify-center text-white font-bold italic text-sm">B</div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">Banner UMKM</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-6 italic">"Support visual gratis untuk mitra UMKM Arta Utama."</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-red-600">Marketing</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-red-600">Visual</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO --- */}
      <section id="portfolio" className="py-16 md:py-24 bg-slate-50 border-y border-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-[#054fa0] uppercase tracking-widest mb-2">Showcase</p>
          <h2 className="text-center text-3xl md:text-5xl font-black tracking-tight mb-12 text-[#054fa0]">Hasil Karya</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] md:aspect-video bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full h-full bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-dashed border-slate-200">
                  <span className="text-slate-300 text-[10px] italic font-mono uppercase tracking-widest">Asset Visual {i}</span>
                </div>
                <p className="text-[10px] font-black text-[#054fa0] tracking-widest uppercase italic">Branding 2026</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-20 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-[#054fa0]">Beraksi, Berkreasi</h2>
        <p className="text-base md:text-xl text-slate-500 leading-relaxed mb-10">
          Sesuatu yang besar akan timbul melalui hal hal kecil yang terus menerus dieksekusi.
        </p>
        <div className="flex justify-center gap-8 md:gap-12">
          <div className="text-left border-l-2 border-yellow-400 pl-3">
            <p className="text-2xl md:text-4xl font-black italic uppercase leading-none">High</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Creativity</p>
          </div>
          <div className="text-left border-l-2 border-[#054fa0] pl-3">
            <p className="text-2xl md:text-4xl font-black leading-none uppercase">100%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal Build</p>
          </div>
        </div>
      </section>

      {/* --- CONTACT (Fonnte Integration) --- */}
      <section id="contact" className="py-12 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-[#054fa0] p-8 md:p-16 rounded-[40px] text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white leading-tight">Start a conversation.</h2>
          <p className="text-blue-100 mb-8 text-sm md:text-base">Kirim request langsung ke workspace tim kreatif.</p>
          <textarea 
            className="w-full p-5 rounded-2xl border border-blue-800 bg-blue-900/40 text-white mb-6 h-32 md:h-40 focus:ring-4 focus:ring-yellow-400 outline-none text-sm md:text-base placeholder:text-blue-300"
            placeholder="Kebutuhan desain atau sistem..."
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
          />
          <button 
            onClick={kirimNotif}
            className="w-full md:w-auto bg-yellow-400 text-[#054fa0] px-10 py-4 rounded-2xl font-black text-base md:text-lg hover:bg-white active:scale-95 transition-all shadow-xl shadow-yellow-900/20"
          >
            Deploy Request
          </button>
          <p className="mt-6 text-xs font-bold tracking-widest text-yellow-200 uppercase italic">{status}</p>
        </div>
      </section>

      {/* --- FOOTER (Hidden Admin Entry) --- */}
      <footer className="py-12 border-t border-slate-100 text-center px-6">
        <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-4">
          © 2026 ARTA CREATIVE • <span className="text-[#054fa0]">BPR Arta Utama</span>
        </p>
        {/* PINTU RAHASIA ADMIN */}
        <a href="/laporan" className="text-[9px] text-slate-300 hover:text-[#054fa0] transition-colors uppercase tracking-widest font-bold">
          Internal Dashboard Login
        </a>
      </footer>
    </div>
  );
}