import { generateQrCodes } from '../utils/generateQrCodes';

export async function POST(req: Request) {
  try {
    const { guests } = await req.json();
    if (!guests || !Array.isArray(guests)) {
      return new Response(JSON.stringify({ error: 'Invalid guest list' }), {
        status: 400,
      });
    }

    const updatedGuests = await generateQrCodes(guests);
    return new Response(JSON.stringify({ guests: updatedGuests }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Error generating QR codes',
        details: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
