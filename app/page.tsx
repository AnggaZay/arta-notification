'use client';
import { useState } from 'react';

export default function ArtaCreative() {
  const [pesan, setPesan] = useState('');
  const [status, setStatus] = useState('');

  const kirimNotif = async () => {
    if (!pesan) return alert("Please enter your message first.");
    setStatus('⌛ Processing request...');
    try {
      const res = await fetch('/api/send-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `New Tech Request: ${pesan}` }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('✅ Message synced to Creative Team.');
        setPesan('');
      } else { setStatus('❌ Sync failed.'); }
    } catch (err) { setStatus('❌ Connection error.'); }
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-blue-100">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 px-8 py-4 flex justify-between items-center">
        <div className="font-black text-xl tracking-tighter text-[#054fa0]">
          ARTA.<span className="text-red-600">.</span>Creative
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
          <a href="#projek" className="hover:text-[#054fa0] transition-colors">Projects</a>
          <a href="#portfolio" className="hover:text-[#054fa0] transition-colors">Showcase</a>
          <a href="#about" className="hover:text-[#054fa0] transition-colors">Team</a>
        </div>
        <a href="#contact" className="bg-[#054fa0] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400 hover:text-[#054fa0] transition-all shadow-md shadow-blue-900/10">Start a Project</a>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-50 text-[#054fa0] rounded-full border border-blue-100">
          Official Creative Hub of BPR Arta Utama
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-slate-950">
          Membangun Karakter <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#054fa0] to-blue-500">Lewat Visual</span>.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Fokus pada progres kreatif dan menjaga karakter merk melalui visual, komunikasi dan feedback terhadap nasabah.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="#projek" className="bg-[#054fa0] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-200 transition-all">Lihat Proyek</a>
          <a href="#portfolio" className="bg-yellow-400 text-[#054fa0] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-200">Portfolio</a>
        </div>
      </section>

      {/* --- PROJEK (ACTIVE STACKS) --- */}
      <section id="projek" className="py-24 px-8 max-w-7xl mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2 italic">Ongoing Projects</h2>
            <p className="text-4xl font-black tracking-tight text-[#054fa0]">Proyek Aktif</p>
          </div>
          <div className="h-1 w-24 bg-yellow-400 mt-4 md:mb-2"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="group p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#054fa0] hover:bg-white transition-all shadow-sm">
            <div className="w-12 h-12 bg-[#054fa0] rounded-xl mb-6 flex items-center justify-center text-white font-bold italic">T</div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-[#054fa0] transition-colors">Pengelolaan Sosial Media</h3>
            <p className="text-slate-500 leading-relaxed mb-6">Pengelolaan sosial media oleh Tim Kreatif, membuat konten dan menjaga tampilan merk pada karakter yang sesuai</p>
            <div className="flex gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono text-[#054fa0] font-bold">Konten Kreator</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono text-[#054fa0] font-bold">Desainer Grafis</span>
            </div>
          </div>
          <div className="group p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-red-200 hover:bg-white transition-all shadow-sm">
            <div className="w-12 h-12 bg-red-600 rounded-xl mb-6 flex items-center justify-center text-white font-bold italic">R</div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors">Banner UMKM</h3>
            <p className="text-slate-500 leading-relaxed mb-6">Pembuatan banner UMKM secara gratis bagi UMKM.</p>
            <div className="flex gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono text-red-600 font-bold">Desainer Grafis</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono text-red-600 font-bold">Marketing</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO --- */}
      <section id="portfolio" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-sm font-bold text-[#054fa0] uppercase tracking-widest mb-2">Our Portfolio</h2>
          <p className="text-4xl font-black tracking-tight mb-16">Selected Works</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group aspect-video bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-8 text-center shadow-sm hover:border-[#054fa0] transition-all">
                <div className="w-full h-32 bg-slate-50 rounded-lg mb-4 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <span className="text-slate-300 text-xs italic font-mono group-hover:text-[#054fa0]">Asset Visual {i}</span>
                </div>
                <h4 className="font-bold text-slate-800">Visual Identity {i}</h4>
                <p className="text-xs text-[#054fa0] mt-1 uppercase tracking-widest font-black">Branding • 2026</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT US --- */}
      <section id="about" className="py-24 px-8 max-w-4xl mx-auto text-center">
        <div className="w-12 h-1 bg-red-600 mx-auto mb-8"></div>
        <h2 className="text-5xl font-black mb-8 tracking-tight text-[#054fa0]">Beraksi, Berkreasi</h2>
        <p className="text-xl text-slate-500 leading-relaxed mb-12">
          Sesuatu yang besar akan timbul melalui hal hal kecil yang terus menerus dieksekusi, karena konsistensi akan menimbulkan hasil yang stabil.
        </p>
        <div className="flex justify-center gap-12">
          <div className="border-l-4 border-yellow-400 pl-4 text-left">
            <p className="text-4xl font-black text-slate-900 leading-none uppercase">High</p>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Creativity</p>
          </div>
          <div className="border-l-4 border-[#054fa0] pl-4 text-left">
            <p className="text-4xl font-black text-slate-900 leading-none uppercase">100%</p>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Internal Build</p>
          </div>
        </div>
      </section>

      {/* --- CONTACT (MODERN FORM) --- */}
      <section id="contact" className="py-24 px-8">
        <div className="max-w-3xl mx-auto bg-[#054fa0] p-12 rounded-[40px] text-center shadow-2xl shadow-blue-900/40 relative overflow-hidden">
          {/* Aksen Kuning Kecil */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -mr-16 -mt-16"></div>
          
          <h2 className="text-4xl font-black mb-4 text-white">Start a conversation.</h2>
          <p className="text-blue-100 mb-10">Send a request directly to our team's workspace.</p>
          <textarea 
            className="w-full p-6 rounded-2xl border border-blue-800 bg-blue-900/50 text-white mb-6 h-40 focus:ring-4 focus:ring-yellow-400 outline-none transition-all placeholder:text-blue-300"
            placeholder="Tell us about your project or request..."
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
          />
          <button 
            onClick={kirimNotif}
            className="w-full md:w-auto bg-yellow-400 text-[#054fa0] px-12 py-5 rounded-2xl font-black text-lg hover:bg-white transition-all active:scale-95 shadow-xl shadow-yellow-900/20"
          >
            Deploy Message
          </button>
          <p className="mt-6 text-sm font-bold tracking-widest text-yellow-200 uppercase italic">{status}</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">
        © 2026 ARTA CREATIVE • <span className="text-[#054fa0]">BPR Arta Utama</span>
      </footer>
    </div>
  );
}