'use client';
import { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';
import * as XLSX from 'xlsx'; // Taruh di paling atas
import { db } from "@/app/lib/firebase";
import { ref, push, set, onValue, remove } from "firebase/database";
import { useEffect } from 'react';

export default function DatabaseLaporan() {
    const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(listLaporan);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Arta");
  XLSX.writeFile(workbook, "Laporan_Kinerja_Creative.xlsx");
};

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Kita kasih tahu TypeScript kalau isinya bisa apa aja (any)
  const [listLaporan, setListLaporan] = useState<any[]>([
    { id: 1, tanggal: '2026-01-14', nama: 'Desain Banner Promo', jenis: 'Konten Marketing', status: 'Selesai', ket: 'Sudah di-post IG' },
  ]);
  
  const [form, setForm] = useState<any>({ id: null, tanggal: '', nama: '', jenis: 'Konten Marketing', status: 'Proses', ket: '' });

  useEffect(() => {
    const dbRef = ref(db, 'laporan_creative');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.values(data);
        setListLaporan(formattedData);
      } else {
        setListLaporan([]);
      }
    });
  }, []);

  // Fungsi Simpan/Edit ke Firebase
  const handleSave = async () => {
    if (!form.nama) return alert("Nama project jangan kosong, Ngga!");

    const dbRef = ref(db, 'laporan_creative');

    try {
      if (form.id) {
        // Jika ada ID, berarti kita UPDATE data yang sudah ada
        await set(ref(db, `laporan_creative/${form.id}`), form);
      } else {
        // Jika tidak ada ID, kita BUAT data baru (PUSH)
        const newDataRef = push(dbRef);
        const newId = newDataRef.key;
        await set(newDataRef, { ...form, id: newId });
      }
      closeModal();
    } catch (error) {
      console.error("Gagal simpan ke Firebase:", error);
    }
  };

  // Fungsi Hapus dari Firebase
  const hapusData = async (id: any) => {
    if (confirm('Yakin mau hapus data ini, Ngga?')) {
      try {
        await remove(ref(db, `laporan_creative/${id}`));
      } catch (error) {
        console.error("Gagal hapus:", error);
      }
    }
  };
  

  const openModal = (item: any = null) => {
    if (item) setForm(item);
    else setForm({ id: null, tanggal: '', nama: '', jenis: 'Konten Marketing', status: 'Proses', ket: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 text-left">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <Link href="/laporan" className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
            <ArrowLeft size={14} /> Back
          </Link>
          <button onClick={() => openModal()} className="bg-[#054fa0] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all">
            Add Report
          </button>
        </div>
<button 
  onClick={exportToExcel} 
  className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase hover:bg-green-700 transition-all mb-4"
>
  <FileSpreadsheet size={16} /> Export Excel
</button>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Name</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listLaporan.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="p-6 font-black text-slate-900 text-left">{item.nama}</td>
                  <td className="p-6 flex justify-center gap-4">
                    <button onClick={() => openModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={16}/></button>
                    <button onClick={() => hapusData(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-left">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl relative">
            <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tighter">DATA ENTRY</h2>
            <div className="space-y-4">
              <input 
                className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none font-bold" 
                placeholder="Nama Project" 
                value={form.nama} 
                onChange={(e)=>setForm({...form, nama: e.target.value})} 
              />
              <button onClick={handleSave} className="w-full bg-[#054fa0] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10">
                Save Data
              </button>
              <button onClick={closeModal} className="w-full text-slate-400 font-bold text-xs uppercase tracking-widest">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}