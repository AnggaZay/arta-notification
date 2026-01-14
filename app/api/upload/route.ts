import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    const fileName = (formData.get('fileName') as string) || `arta_${Date.now()}`;

    if (!file) return NextResponse.json({ error: "File kosong" }, { status: 400 });

    // 1. AUTH - Pakai satu objek biar VS Code ijo
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
      key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive.file'], // Pakai scope .file aja biar lebih enteng
    } as any);

    const drive = google.drive({ version: 'v3', auth });
    const buffer = Buffer.from(await file.arrayBuffer());

    // 2. LANGSUNG NAMPEL - Tanpa drama transfer quota
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!], // Langsung tunjuk folder tujuan
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: 'id, webViewLink',
    });

    return NextResponse.json({ 
      id: response.data.id, 
      link: response.data.webViewLink 
    });

  } catch (error: any) {
    console.error("DRIVE_ERROR:", error.message);
    return NextResponse.json({ 
      error: error.message,
      detail: "Cek apakah robot sudah jadi Editor di folder Drive lu" 
    }, { status: 500 });
  }
}