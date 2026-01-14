import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    const fileName = (formData.get('fileName') as string) || 'upload_arta';

    if (!file) return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });

    // JURUS PAMUNGKAS: Masukkan config ke objek any dulu
    const credentials: any = {
      client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    };

    // Kita buat objek config yang rapi sesuai mau-nya Google
    const authOptions: any = {
      email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
      key: (process.env.GOOGLE_DRIVE_PRIVATE_KEY as string)?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive'],
    };

    // Panggil JWT dengan satu objek tunggal
    const auth = new google.auth.JWT(authOptions);

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