'use client';
import { useState } from 'react';
import { ArrowLeft, PlusCircle, FileSpreadsheet, Save } from 'lucide-react';
import Link from 'next/link';
import * as XLSX from 'xlsx';

export default function InputLaporan() {
  const [listLaporan, setListLaporan] = useState([
    { no: 1, tanggal: '2026-01-14', nama: 'Desain Banner Promo', jenis: 'Konten Marketing', status: 'Selesai', ket: 'Sudah di-post IG' }
  ]);
  const [form, setForm] = useState({ tanggal: '', nama: '', jenis: 'Konten Marketing', status: 'Proses', ket: '' });

  const tambahData = () => {
    if (!form.nama || !form.tanggal) return alert('Isi Nama & Tanggal dulu, Ngga!');
    setListLaporan([...listLaporan, { ...form, no: listLaporan.length + 1 }]);
    setForm({ ...form, nama: '', ket: '' });
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(listLaporan);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan");
    XLSX.writeFile(wb, `Laporan_Kerja_Arta.xlsx`);
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <Link href="/laporan" className="flex items-center gap-2 text-slate-400 hover:text-[#054fa0] font-bold text-xs uppercase mb-8 transition-all">
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </Link>

        <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter">INPUT <span className="text-[#054fa0]">PROGRES.</span></h1>

        {/* FORM AREA */}
        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="date" className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none" value={form.tanggal} onChange={(e)=>setForm({...form, tanggal: e.target.value})} />
          <input type="text" placeholder="Nama Project" className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none" value={form.nama} onChange={(e)=>setForm({...form, nama: e.target.value})} />
          <select className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none" value={form.jenis} onChange={(e)=>setForm({...form, jenis: e.target.value})}>
            <option>Konten Marketing</option>
            <option>Banner UMKM</option>
            <option>Web Design</option>
          </select>
          <select className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none" value={form.status} onChange={(e)=>setForm({...form, status: e.target.value})}>
            <option>Selesai</option>
            <option>Proses</option>
            <option>Revisi</option>
          </select>
          <input type="text" placeholder="Keterangan" className="p-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none" value={form.ket} onChange={(e)=>setForm({...form, ket: e.target.value})} />
          <button onClick={tambahData} className="bg-[#054fa0] text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-800 transition-all"><PlusCircle size={20}/> Tambah Data</button>
        </div>

        {/* TABLE AREA */}
        <div className="overflow-x-auto bg-white border border-slate-100 rounded-[32px] shadow-sm mb-8">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-5 text-center">No</th>
                <th className="p-5">Tanggal</th>
                <th className="p-5">Project</th>
                <th className="p-5">Status</th>
                <th className="p-5">Ket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listLaporan.map((item, i) => (
                <tr key={i} className="hover:bg-blue-50/20 transition-all">
                  <td className="p-5 text-center font-black text-slate-300">{item.no}</td>
                  <td className="p-5 font-medium">{item.tanggal}</td>
                  <td className="p-5 font-bold text-[#054fa0]">{item.nama}</td>
                  <td className="p-5"><span className="px-3 py-1 bg-blue-50 text-[#054fa0] rounded-lg text-[10px] font-black uppercase">{item.status}</span></td>
                  <td className="p-5 text-slate-400 italic text-xs">{item.ket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={exportExcel} className="flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-green-700 transition-all shadow-lg shadow-green-900/10">
          <FileSpreadsheet size={20} /> Export ke Excel
        </button>
      </div>
    </div>
  );
}