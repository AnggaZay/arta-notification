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
        <div className="font-black text-xl tracking-tighter text-blue-600">ARTA-UTAMA.CREATIVE</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
          <a href="#projek" className="hover:text-blue-600 transition-colors">Projects</a>
          <a href="#portfolio" className="hover:text-blue-600 transition-colors">Showcase</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">Team</a>
        </div>
        <a href="#contact" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all">Start a Project</a>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-50 text-blue-600 rounded-full border border-blue-100">
          Tim Kreatif BPR Arta Utama
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-slate-950">
          Membangun Karakter <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Lewat Visual</span>.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Fokus pada progres kreatif dan menjaga karakter merk melalui visual, komunikasi dan feedback terhadap nasabah.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="#projek" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-200 transition-all">Lihat Proyek</a>
          <a href="#portfolio" className="bg-slate-100 text-slate-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all">Portfolio</a>
        </div>
      </section>

      {/* --- PROJEK (ACTIVE STACKS) --- */}
      <section id="projek" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Ongoing Projects</h2>
            <p className="text-3xl font-bold tracking-tight">Proyek Aktif</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="group p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all shadow-sm">
            <div className="w-12 h-12 bg-blue-600 rounded-xl mb-6 flex items-center justify-center text-white font-bold italic">T</div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Pengelolaan Sosial Media</h3>
            <p className="text-slate-500 leading-relaxed mb-6">Pengelolaan sosial media oleh Tim Kreatif, membuat konten dan menjaga tampilan merk pada karakter yang sesuai</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono">Konten Kreator</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono">Desainer Grafis</span>
            </div>
          </div>
          <div className="group p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all shadow-sm">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl mb-6 flex items-center justify-center text-white font-bold italic">R</div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">Banner UMKM</h3>
            <p className="text-slate-500 leading-relaxed mb-6">Pembuatan banner UMKM secara gratis bagi UMKM.</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono">Desainer Grafis</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono">Konten Kreator</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono">Marketing</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO --- */}
      <section id="portfolio" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2 text-center">Our Portfolio</h2>
          <p className="text-3xl font-bold tracking-tight text-center mb-16">Selected Works</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-8 text-center shadow-sm hover:shadow-md transition-all">
                <div className="w-full h-32 bg-slate-50 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-slate-300 text-xs italic font-mono">Image Placeholder</span>
                </div>
                <h4 className="font-bold text-slate-800">Visual Identity {i}</h4>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold text-blue-600">Branding • 2026</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT US --- */}
      <section id="about" className="py-24 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-8 tracking-tight">Beraksi , Berkreasi</h2>
        <p className="text-xl text-slate-500 leading-relaxed mb-12">
          Sesuatu yang besar akan timbul melalui hal hal kecil yang terus menerus dieksekusi, karena konsistensi akan menimbulkan hasil yang stabil.
        </p>
        <div className="flex justify-center gap-12">
          <div><p className="text-4xl font-black text-slate-900">High</p><p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Creativity</p></div>
          <div><p className="text-4xl font-black text-slate-900">100%</p><p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Internal Build</p></div>
        </div>
      </section>

      {/* --- CONTACT (MODERN FORM) --- */}
      <section id="contact" className="py-24 px-8">
        <div className="max-w-3xl mx-auto bg-slate-950 p-12 rounded-[40px] text-center shadow-2xl">
          <h2 className="text-4xl font-black mb-4 text-white">Start a conversation.</h2>
          <p className="text-slate-400 mb-10">Send a request directly to our team's workspace.</p>
          <textarea 
            className="w-full p-6 rounded-2xl border border-slate-800 bg-slate-900 text-white mb-6 h-40 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
            placeholder="Tell us about your project or request..."
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
          />
          <button 
            onClick={kirimNotif}
            className="w-full md:w-auto bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-900/20"
          >
            Deploy Message
          </button>
          <p className="mt-6 text-sm font-bold tracking-widest text-blue-400 uppercase italic">{status}</p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-xs font-bold tracking-widest uppercase">
        © 2026 ARTA CREATIVE • BPR Arta Utama
      </footer>
    </div>
  );
}