import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    // Data Fonnte lu yang tadi
    const token = 'fNbbV7sEdM81EWv44hMi'; 
    const target = '6287794274408'; 

    const formData = new FormData();
    formData.append('target', target);
    formData.append('message', message);

    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
      body: formData,
    });

    const result = await response.json();

    if (!result.status) {
      return NextResponse.json({ success: false, log: result.reason }, { status: 400 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ success: false, log: error.message }, { status: 500 });
  }
}