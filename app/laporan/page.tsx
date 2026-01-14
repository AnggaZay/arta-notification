'use client';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { FileSpreadsheet, Lock, LogOut, PlusCircle } from 'lucide-react';

export default function LaporanKreatif() {
  // --- KEAMANAN LOGIN SEDERHANA ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  
  // --- STATE DATA LAPORAN ---
  const [listLaporan, setListLaporan] = useState([
    { no: 1, tanggal: '2025-10-13', nama: 'Konten Deposito', jenis: 'Konten Marketing', status: 'Selesai', ket: 'Sudah Post' }
  ]);
  const [form, setForm] = useState({ tanggal: '', nama: '', jenis: 'Konten Marketing', status: 'Proses', ket: '' });

  // Fungsi Login (Ganti 'arta123' dengan password rahasia lu)
  const handleLogin = () => {
    if (password === 'arta123') { setIsLoggedIn(true); } 
    else { alert('Password Salah!'); }
  };

  // Fungsi Tambah Data
  const tambahData = () => {
    if (!form.nama || !form.tanggal) return alert('Isi Nama & Tanggal!');
    setListLaporan([...listLaporan, { ...form, no: listLaporan.length + 1 }]);
    setForm({ ...form, nama: '', ket: '' }); // Reset form
  };

  // Fungsi Export ke Excel (Format Persis Laporan Lu)
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(listLaporan);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Desain");
    XLSX.writeFile(workbook, `Laporan_Kreatif_Arta_${form.tanggal || 'Terbaru'}.xlsx`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#054fa0]">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#054fa0] mb-2">Internal Access</h2>
          <p className="text-slate-400 text-sm mb-6">Khusus Tim Kreatif BPR Arta Utama</p>
          <input 
            type="password" 
            placeholder="Input Password" 
            className="w-full p-4 rounded-xl border border-slate-200 mb-4 focus:ring-2 focus:ring-[#054fa0] outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-[#054fa0] text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">Masuk Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black tracking-tight text-[#054fa0]">LAPORAN<span className="text-red-600">.</span>DESAIN</h1>
          <button onClick={() => setIsLoggedIn(false)} className="text-slate-400 hover:text-red-600 flex items-center gap-2 font-bold text-sm"><LogOut size={18}/> Logout</button>
        </div>

        {/* --- FORM INPUT --- */}
        <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="date" className="p-3 rounded-xl border-none ring-1 ring-slate-200" value={form.tanggal} onChange={(e)=>setForm({...form, tanggal: e.target.value})} />
          <input type="text" placeholder="Nama Desain" className="p-3 rounded-xl border-none ring-1 ring-slate-200" value={form.nama} onChange={(e)=>setForm({...form, nama: e.target.value})} />
          <select className="p-3 rounded-xl border-none ring-1 ring-slate-200" value={form.jenis} onChange={(e)=>setForm({...form, jenis: e.target.value})}>
            <option>Konten Marketing</option>
            <option>Foto Profile</option>
            <option>Banner UMKM</option>
          </select>
          <select className="p-3 rounded-xl border-none ring-1 ring-slate-200" value={form.status} onChange={(e)=>setForm({...form, status: e.target.value})}>
            <option>Selesai</option>
            <option>Proses</option>
            <option>Revisi</option>
          </select>
          <input type="text" placeholder="Keterangan (Contoh: Sudah Post)" className="p-3 rounded-xl border-none ring-1 ring-slate-200 md:col-span-1" value={form.ket} onChange={(e)=>setForm({...form, ket: e.target.value})} />
          <button onClick={tambahData} className="bg-[#054fa0] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all"><PlusCircle size={20}/> Tambah Baris</button>
        </div>

        {/* --- TABEL DATA --- */}
        <div className="overflow-x-auto bg-white border border-slate-100 rounded-[24px] shadow-sm mb-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-widest font-bold">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Hari/Tanggal</th>
                <th className="p-4">Nama Desain</th>
                <th className="p-4">Jenis</th>
                <th className="p-4">Status</th>
                <th className="p-4">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listLaporan.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-bold">{item.no}</td>
                  <td className="p-4">{item.tanggal}</td>
                  <td className="p-4 font-medium text-[#054fa0]">{item.nama}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-[#054fa0] rounded-md text-[10px] font-bold uppercase">{item.jenis}</span></td>
                  <td className="p-4"><span className={`font-bold ${item.status === 'Selesai' ? 'text-green-600' : 'text-orange-500'}`}>{item.status}</span></td>
                  <td className="p-4 text-slate-500">{item.ket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- TOMBOL EXPORT --- */}
        <button 
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
        >
          <FileSpreadsheet size={20} /> Export ke Excel (.xlsx)
        </button>
      </div>
    </div>
  );
}