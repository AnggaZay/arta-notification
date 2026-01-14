'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const kirimPesan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const form = e.currentTarget;
    const pesanInput = form.elements.namedItem('pesan') as HTMLInputElement;
    const isiPesan = pesanInput.value;

    try {
      const res = await fetch('/api/send-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: isiPesan }),
      });

      const json = await res.json();

      if (json.success) {
        setStatus('✅ Berhasil! Cek WA kamu.');
        pesanInput.value = ''; // Reset form
      } else {
        setStatus('❌ Gagal: ' + json.error);
      }
    } catch (err) {
      setStatus('❌ Error sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Tes Fonnte API ⚡</h1>
        <p className="text-zinc-400 mb-6 text-sm">Kirim notifikasi WA langsung dari sini.</p>

        <form onSubmit={kirimPesan} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Isi Pesan</label>
            <textarea 
              name="pesan" 
              required 
              rows={3} 
              placeholder="Halo, ini tes dari Next.js..."
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <button 
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
            {loading ? 'Mengirim...' : 'Kirim Sekarang'}
          </button>
        </form>

        {status && (
          <div className="mt-6 p-3 bg-zinc-800 rounded-lg text-center text-sm font-medium">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}