'use client';
import { ArrowLeft, BarChart3, PieChart, Target, Award } from 'lucide-react';
import Link from 'next/link';

export default function AnalisisKinerja() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <Link href="/laporan" className="flex items-center gap-2 text-slate-400 hover:text-red-600 font-bold text-xs uppercase mb-8 transition-all">
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </Link>

        <h1 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter italic text-left">PERFORMANCE <span className="text-red-600">ANALYTICS.</span></h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* CARD GOALS */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
             <Target className="absolute -right-4 -top-4 text-slate-50" size={120} />
             <div className="relative z-10 text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Monthly Target</p>
                <h2 className="text-5xl font-black text-slate-900 mb-2">92%</h2>
                <div className="w-full bg-slate-100 h-3 rounded-full mb-6">
                    <div className="bg-red-600 h-3 rounded-full w-[92%] shadow-lg shadow-red-200"></div>
                </div>
                <p className="text-sm text-slate-400 font-medium italic">Sedikit lagi mencapai target bulanan (120/130 Konten).</p>
             </div>
          </div>

          {/* CARD ACHIEVEMENT */}
          <div className="bg-[#054fa0] p-10 rounded-[40px] shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden">
             <Award className="absolute -right-4 -top-4 text-white/5" size={120} />
             <div className="relative z-10 text-left">
                <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-4">Top Performance</p>
                <h2 className="text-3xl font-black mb-4 leading-tight">Konten Marketing Terbanyak Bulan Ini</h2>
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                    <div className="text-4xl font-black">42</div>
                    <div className="text-xs font-bold uppercase tracking-tighter leading-none">Total Desain<br/>Feed Instagram</div>
                </div>
             </div>
          </div>
        </div>

        {/* GRAFIK SEDERHANA (VISUAL SAJA) */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-left">
            <div className="flex justify-between items-center mb-10">
                <h3 className="font-black text-[#054fa0] uppercase tracking-widest text-xs">Aktivitas Mingguan</h3>
                <BarChart3 size={20} className="text-slate-300" />
            </div>
            <div className="flex items-end justify-between h-48 gap-2 md:gap-6">
                {[40, 70, 45, 90, 65, 30, 85].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3">
                        <div className={`w-full rounded-t-xl transition-all hover:brightness-110 ${i === 3 ? 'bg-[#054fa0]' : 'bg-slate-100'}`} style={{ height: `${h}%` }}></div>
                        <span className="text-[10px] font-bold text-slate-300 uppercase leading-none">{['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'][i]}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}