'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Trash2, FileSpreadsheet, Upload, Loader2 } from 'lucide-react';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { db } from "@/app/lib/firebase";
import { ref, onValue, push, set, remove } from "firebase/database";

export default function DatabaseLaporan() {
  const [listLaporan, setListLaporan] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<any>({ 
    id: null, 
    tanggal: new Date().toISOString().split('T')[0], 
    nama: '', 
    jenis: 'Konten Marketing', 
    status: 'Proses', 
    ket: '',
    linkFoto: '' 
  });

  // 1. AUTO-SYNC FIREBASE
  useEffect(() => {
    const dbRef = ref(db, 'laporan_creative');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.values(data);
        setListLaporan(formattedData);
      } else {
        setListLaporan([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. EXPORT EXCEL
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(listLaporan);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Arta");
    XLSX.writeFile(workbook, `Laporan_Arta_${new Date().toLocaleDateString()}.xlsx`);
  };

  // 3. UPLOAD KE GOOGLE DRIVE (Via API Route)
  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', `${Date.now()}_${file.name}`);

    console.log("Sedang mencoba upload ke API...");

    try {
      const res = await fetch('/api/upload', { 
        method: 'POST', 
        body: formData 
      });

      const data = await res.json();

      if (res.ok && data.link) {
        setForm({ ...form, linkFoto: data.link });
        alert("Mantap Ngga! Foto berhasil masuk Drive.");
      } else {
        console.error("Error dari API:", data.error);
        alert(`Gagal: ${data.error || "Terjadi kesalahan di server"}`);
      }
    } catch (err) {
      console.error("Error Fetch:", err);
      alert("Koneksi ke API gagal!");
    } finally {
      setUploading(false);
    }
  };

  // 4. SAVE KE FIREBASE
  const handleSave = async () => {
    if (!form.nama) return alert("Nama project wajib diisi!");
    const dbRef = ref(db, 'laporan_creative');

    try {
      if (form.id) {
        await set(ref(db, `laporan_creative/${form.id}`), form);
      } else {
        const newDataRef = push(dbRef);
        await set(newDataRef, { ...form, id: newDataRef.key });
      }
      closeModal();
    } catch (error) {
      alert("Gagal simpan data!");
    }
  };

  const hapusData = async (id: any) => {
    if (confirm('Yakin hapus data ini, Ngga?')) {
      await remove(ref(db, `laporan_creative/${id}`));
    }
  };

  const openModal = (item: any = null) => {
    if (item) setForm(item);
    else setForm({ id: null, tanggal: new Date().toISOString().split('T')[0], nama: '', jenis: 'Konten Marketing', status: 'Proses', ket: '', linkFoto: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <Link href="/laporan" className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
            <ArrowLeft size={14} /> Back
          </Link>
          <div className="flex gap-3">
            <button onClick={exportToExcel} className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-2xl font-bold text-xs uppercase hover:bg-green-700 transition-all shadow-lg shadow-green-900/10">
              <FileSpreadsheet size={16} /> Export
            </button>
            <button onClick={() => openModal()} className="bg-[#054fa0] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all">
              Add Report
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Name</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listLaporan.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="p-6">
                    <p className="font-black text-slate-900">{item.nama}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{item.jenis} • {item.tanggal}</p>
                    {item.linkFoto && <a href={item.linkFoto} target="_blank" className="text-[9px] text-blue-500 underline font-bold">Lihat Foto Drive</a>}
                  </td>
                  <td className="p-6 text-center">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${item.status === 'Selesai' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => openModal(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={16}/></button>
                      <button onClick={() => hapusData(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL INPUT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Data Entry</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Project Name</label>
                <input className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-[#054fa0] outline-none font-bold mt-1" value={form.nama} onChange={(e)=>setForm({...form, nama: e.target.value})} />
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Upload Lampiran (Drive)</label>
                <div className="relative mt-1">
                  <input type="file" onChange={handleFileUpload} className="hidden" id="drive-upload" disabled={uploading} />
                  <label htmlFor="drive-upload" className="flex items-center justify-center gap-2 w-full p-4 bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-slate-200 transition-all text-slate-500 font-bold text-xs">
                    {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                    {uploading ? "Uploading..." : form.linkFoto ? "Foto Terlampir ✅" : "Pilih Foto Project"}
                  </label>
                </div>
              </div>

              <button onClick={handleSave} disabled={uploading} className="w-full bg-[#054fa0] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/10 hover:bg-blue-800 disabled:opacity-50">
                {form.id ? 'Update Report' : 'Save Report'}
              </button>
              <button onClick={closeModal} className="w-full text-slate-400 font-bold text-xs uppercase tracking-widest py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}