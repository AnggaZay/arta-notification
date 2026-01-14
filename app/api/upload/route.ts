import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    const fileName = (formData.get('fileName') as string) || `upload_arta_${Date.now()}`;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // 1. KONFIGURASI AUTH (Bungkam TypeScript & Google API Friendly)
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
      key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive'], // Full scope agar bisa transfer ownership
    } as any);

    const drive = google.drive({ version: 'v3', auth });
    const buffer = Buffer.from(await file.arrayBuffer());

    // 2. EKSEKUSI UPLOAD KE FOLDER TUJUAN
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: 'id, webViewLink',
    });

    const fileId = response.data.id;

    // 3. JURUS SAKTI: PINDAHKAN HAK MILIK KE EMAIL UTAMA LU
    // Ini biar kuota 2TB lu yang kepake, bukan kuota robot
    if (fileId) {
      try {
        await drive.permissions.create({
          fileId: fileId,
          transferOwnership: true,
          moveToNewOwnersRoot: true,
          requestBody: {
            role: 'owner',
            type: 'user',
            emailAddress: 'anggazaidan4@gmail.com', // Email owner Drive lu
          },
        });
      } catch (permError: any) {
        console.error("PERM_ERROR (Ignore if file uploaded):", permError.message);
        // Kadang transfer ownership gagal di folder biasa, tapi file biasanya tetep mendarat.
      }
    }

    return NextResponse.json({ 
      id: fileId, 
      link: response.data.webViewLink 
    });

  } catch (error: any) {
    console.error("DRIVE_ERROR_LOG:", error);
    return NextResponse.json({ 
      error: error.message,
      detail: error.response?.data || "Cek Vercel Logs" 
    }, { status: 500 });
  }
}