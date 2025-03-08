import { connectToDatabase } from '@/app/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { guestId, willBeAttending } = await req.json();

    const { db } = await connectToDatabase();
    const guestsCollection = db.collection('guests');

    const guest = await guestsCollection.findOne({ id: guestId });

    if (!guest) {
      console.error('Guest not found:', guestId);
      return new Response(JSON.stringify({ error: 'Guest not found' }), {
        status: 404,
      });
    }

    await guestsCollection.updateOne(
      { id: guestId },
      { $set: { willBeAttending } }
    );

    return new Response(JSON.stringify({ success: true, guest }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to update RSVP',
        details: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const guestId = url.searchParams.get('id');

    const { db } = await connectToDatabase();
    const guestsCollection = db.collection('guests');

    const guest = await guestsCollection.findOne({ id: Number(guestId) });

    if (!guest) {
      console.error('Guest not found:', guestId);
      return new Response(JSON.stringify({ error: 'Guest not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, guest }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch guest',
        details: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
