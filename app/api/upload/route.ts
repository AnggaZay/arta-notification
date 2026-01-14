import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    const fileName = (formData.get('fileName') as string) || 'upload_arta';

    if (!file) return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });


    // Gunakan satu objek sesuai standar terbaru Google API
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
      key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive'],
    } as any); // <--- Mantra sakti biar VS Code diem

    const drive = google.drive({ version: 'v3', auth: auth as any });
    const buffer = Buffer.from(await file.arrayBuffer());

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

    return NextResponse.json({ 
      id: response.data.id, 
      link: response.data.webViewLink 
    });
  } catch (error: any) {
    console.error("DRIVE_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}