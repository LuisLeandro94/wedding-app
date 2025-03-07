import { connectToDatabase } from '@/app/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { guestId, willBeAttending } = await req.json();

    const { db } = await connectToDatabase();
    const guestsCollection = db.collection('guests');

    const guest = await guestsCollection.findOne({ id: guestId });

    if (!guest) {
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
