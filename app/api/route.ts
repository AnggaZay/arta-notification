import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body; // Kita bikin simpel dulu, terima 'message' aja

    // --- CONFIG FONNTE ---
    // GANTI 'TOKEN_FONNTE_KAMU' DENGAN TOKEN YANG KAMU COPY TADI
    const token = 'fNbbV7sEdM81EWv44hMi'; 
    
    // GANTI DENGAN NOMOR TUJUAN (NOMOR WA KAMU SENDIRI BUAT TES)
    // Format: 08xx atau 628xx
    const target = '087794274408'; 

    const formData = new FormData();
    formData.append('target', target);
    formData.append('message', message);

    // --- TEMBAK KE FONNTE ---
    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
      body: formData,
    });

    const result = await response.json();

    if (!result.status) {
        console.error("Fonnte Gagal:", result);
        return NextResponse.json({ success: false, error: result.reason }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}