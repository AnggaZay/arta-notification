'use client';
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  FileText // <--- Tambahin ini Ngga!
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardKinerja() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[#054fa0] font-black text-[10px] tracking-[0.3em] uppercase mb-2 italic">Creative Performance System</p>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">DASHBOARD<span className="text-[#054fa0]">.</span></h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operator</p>
            <p className="text-sm font-black text-[#054fa0]">{session?.user?.email}</p>
          </div>
        </div>

        {/* TOP STATS (RINGKASAN KINERJA) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#054fa0]">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Output</p>
              <p className="text-2xl font-black text-slate-900">128 <span className="text-xs font-medium text-slate-400 italic">Project</span></p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</p>
              <p className="text-2xl font-black text-slate-900">112 <span className="text-xs font-medium text-slate-400 italic">Desain</span></p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">On Progress</p>
              <p className="text-2xl font-black text-slate-900">16 <span className="text-xs font-medium text-slate-400 italic">Pending</span></p>
            </div>
          </div>
        </div>

        {/* NAVIGATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MENU DATABASE (Dulu namanya Input) */}
<Link href="/laporan/input" className="group relative overflow-hidden bg-[#054fa0] p-10 rounded-[40px] shadow-2xl shadow-blue-900/20 transition-all hover:scale-[1.02]">
  <div className="relative z-10 text-white">
    <FileText size={40} className="mb-6 text-yellow-400" />
    <h2 className="text-3xl font-black mb-2 text-white">Database Laporan</h2>
    <p className="text-blue-200 text-sm italic mb-8">Lihat detail, edit, hapus, dan kelola semua data laporan kerja.</p>
    <span className="bg-white/10 px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase">Manage Database</span>
  </div>
</Link>

          {/* MENU ANALYTICS */}
          <Link href="/laporan/kinerja" className="group relative overflow-hidden bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl transition-all hover:scale-[1.02]">
            <div className="relative z-10 text-slate-900">
              <BarChart3 size={40} className="mb-6 text-red-600" />
              <h2 className="text-3xl font-black mb-2 text-[#054fa0]">Cek Kinerja</h2>
              <p className="text-slate-400 text-sm italic mb-8">Lihat statistik, grafik, dan efektivitas kerja.</p>
              <span className="bg-slate-100 px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase text-slate-400">View Analytics</span>
            </div>
            <div className="absolute -right-10 -bottom-10 text-slate-50 rotate-12 transition-transform group-hover:scale-110">
              <BarChart3 size={200} />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}