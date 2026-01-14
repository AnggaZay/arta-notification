'use client';
import { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import * as XLSX from 'xlsx';
import { FileSpreadsheet, LogOut, PlusCircle, LayoutDashboard, User } from 'lucide-react';

export default function LaporanKreatif() {
  const { data: session, status } = useSession();
  
  // --- STATE DATA LAPORAN ---
  const [listLaporan, setListLaporan] = useState([
    { no: 1, tanggal: '2026-01-13', nama: 'Update Landing Page Arta', jenis: 'Web Design', status: 'Selesai', ket: 'Live on Vercel' }
  ]);
  const [form, setForm] = useState({ tanggal: '', nama: '', jenis: 'Konten Marketing', status: 'Proses', ket: '' });

  // Fungsi Tambah Data
  const tambahData = () => {
    if (!form.nama || !form.tanggal) return alert('Woi Ngga, isi dulu Nama & Tanggalnya!');
    setListLaporan([...listLaporan, { ...form, no: listLaporan.length + 1 }]);
    setForm({ ...form, nama: '', ket: '' }); // Reset form setelah tambah
  };

  // Fungsi Export ke Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(listLaporan);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Desain");
    XLSX.writeFile(workbook, `Laporan_Arta_Creative_${new Date().toLocaleDateString()}.xlsx`);
  };

  // 1. Loading State
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#054fa0] font-bold italic animate-pulse">
        Checking Authentication...
      </div>
    );
  }

  // 2. Tampilan Jika Belum Login Google
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 max-w-sm w-full text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard size={40} className="text-[#054fa0]" />
          </div>
          <h2 className="text-2xl font-black text-[#054fa0] mb-2">Internal Access</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">Pintu masuk khusus Tim Kreatif BPR Arta Utama. Gunakan email terdaftar.</p>
          
          <button 
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all text-slate-700 active:scale-95 shadow-sm"
          >
            <img src="https://authjs.dev/img/providers/google.svg" width="20" alt="google" />
            Sign in with Google
          </button>
          
          <p className="mt-8 text-[10px] text-slate-300 font-bold uppercase tracking-widest italic">Arta Creative Engine v1.0</p>
        </div>
      </div>
    );
  }

  // 3. Tampilan Dashboard (Jika Sudah Login)
  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER DASHBOARD */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-[#054fa0]">
              LAPORAN<span className="text-red-600">.</span>DASHBOARD
            </h1>
            <div className="flex items-center gap-2 mt-1 text-slate-400">
              <User size={14} />
              <p className="text-xs font-bold uppercase tracking-widest italic">Active: {session.user?.email}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut()} 
            className="bg-red-50 text-red-600 px-5 py-2 rounded-full flex items-center gap-2 font-black text-xs hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            <LogOut size={16}/> LOGOUT
          </button>
        </div>

        {/* --- FORM INPUT --- */}
        <div className="bg-slate-50 p-6 md:p-8 rounded-[32px] border border-slate-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-sm">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Tanggal Project</label>
            <input type="date" className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] transition-all outline-none bg-white font-medium" value={form.tanggal} onChange={(e)=>setForm({...form, tanggal: e.target.value})} />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Nama Pekerjaan/Desain</label>
            <input type="text" placeholder="Contoh: Banner Promo Januari" className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] transition-all outline-none bg-white font-medium" value={form.nama} onChange={(e)=>setForm({...form, nama: e.target.value})} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Jenis Pekerjaan</label>
            <select className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none bg-white font-medium appearance-none" value={form.jenis} onChange={(e)=>setForm({...form, jenis: e.target.value})}>
              <option>Konten Marketing</option>
              <option>Foto Profile</option>
              <option>Banner UMKM</option>
              <option>Web Design</option>
              <option>Cetak/Lainnya</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Status</label>
            <select className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none bg-white font-medium italic" value={form.status} onChange={(e)=>setForm({...form, status: e.target.value})}>
              <option>Selesai</option>
              <option>Proses</option>
              <option>Revisi</option>
              <option>Pending</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 md:col-span-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Keterangan Tambahan</label>
            <input type="text" placeholder="Contoh: Sudah diperiksa Pak Herland" className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] transition-all outline-none bg-white font-medium" value={form.ket} onChange={(e)=>setForm({...form, ket: e.target.value})} />
          </div>

          <button 
            onClick={tambahData} 
            className="bg-[#054fa0] text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 active:scale-95 mt-auto md:h-14"
          >
            <PlusCircle size={20}/> TAMBAH DATA
          </button>
        </div>

        {/* --- TABEL DATA --- */}
        <div className="overflow-hidden bg-white border border-slate-100 rounded-[32px] shadow-sm mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-widest font-black">
                <tr>
                  <th className="p-5">No</th>
                  <th className="p-5">Hari/Tanggal</th>
                  <th className="p-5">Pekerjaan</th>
                  <th className="p-5">Kategori</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {listLaporan.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/20 transition-colors group">
                    <td className="p-5 font-black text-slate-300 group-hover:text-[#054fa0]">{item.no}</td>
                    <td className="p-5 font-medium">{item.tanggal}</td>
                    <td className="p-5 font-bold text-[#054fa0]">{item.nama}</td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                        {item.jenis}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${
                        item.status === 'Selesai' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-5 text-slate-400 italic text-xs">{item.ket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- TOMBOL EXPORT --- */}
        <div className="flex justify-center md:justify-start">
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-3 bg-green-600 text-white px-10 py-5 rounded-[20px] font-black text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 active:scale-95"
          >
            <FileSpreadsheet size={24} /> EXPORT KE EXCEL
          </button>
        </div>
      </div>
    </div>
  );
}