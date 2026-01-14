'use client';
import { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, Save, X, FileDown } from 'lucide-react';
import Link from 'next/link';
import * as XLSX from 'xlsx';

export default function DatabaseLaporan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [listLaporan, setListLaporan] = useState([
    { id: 1, tanggal: '2026-01-14', nama: 'Desain Banner Promo', jenis: 'Konten Marketing', status: 'Selesai', ket: 'Sudah di-post IG' },
    { id: 2, tanggal: '2026-01-13', nama: 'Web Design Arta', jenis: 'Web Design', status: 'Proses', ket: 'Revisi bagian footer' },
  ]);
  
  const [form, setForm] = useState({ id: null, tanggal: '', nama: '', jenis: 'Konten Marketing', status: 'Proses', ket: '' });

  // Fungsi Tambah/Edit
  const handleSave = () => {
    if (form.id) {
      setListLaporan(listLaporan.map(item => item.id === form.id ? form : item));
    } else {
      setListLaporan([...listLaporan, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const openModal = (item = null) => {
    if (item) setForm(item);
    else setForm({ id: null, tanggal: '', nama: '', jenis: 'Konten Marketing', status: 'Proses', ket: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const hapusData = (id) => {
    if(confirm('Yakin mau hapus data ini, Ngga?')) {
      setListLaporan(listLaporan.filter(item => item.id !== id));
    }
  };

  const filteredData = listLaporan.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans text-left">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER & NAV */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <Link href="/laporan" className="flex items-center gap-2 text-slate-400 hover:text-[#054fa0] font-bold text-[10px] uppercase tracking-widest mb-4 transition-all">
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">DATA <span className="text-[#054fa0]">REPORTS.</span></h1>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#054fa0] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
              <Plus size={18} /> Add New Report
            </button>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-6 flex items-center gap-4">
          <Search className="text-slate-300 ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Cari nama project..." 
            className="w-full bg-transparent border-none outline-none text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLE DATABASE */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Project & Date</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="p-6">
                      <p className="font-black text-slate-900 group-hover:text-[#054fa0] transition-colors">{item.nama}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.tanggal}</p>
                    </td>
                    <td className="p-6">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{item.jenis}</span>
                    </td>
                    <td className="p-6">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase ${
                        item.status === 'Selesai' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openModal(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={16}/></button>
                        <button onClick={() => hapusData(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL INPUT/EDIT (POPUP) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl relative">
            <button onClick={closeModal} className="absolute right-8 top-8 text-slate-300 hover:text-slate-900"><X size={24}/></button>
            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tighter">
              {form.id ? 'EDIT REPORT' : 'NEW ENTRY'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Name</label>
                <input type="text" className="w-full p-4 mt-1 bg-slate-50 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none font-bold" value={form.nama} onChange={(e)=>setForm({...form, nama:e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                  <input type="date" className="w-full p-4 mt-1 bg-slate-50 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none font-bold" value={form.tanggal} onChange={(e)=>setForm({...form, tanggal:e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select className="w-full p-4 mt-1 bg-slate-50 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none font-bold" value={form.jenis} onChange={(e)=>setForm({...form, jenis:e.target.value})}>
                    <option>Konten Marketing</option>
                    <option>Banner UMKM</option>
                    <option>Web Design</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSave} className="w-full bg-[#054fa0] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] mt-6 flex items-center justify-center gap-3">
                <Save size={18}/> Save Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}