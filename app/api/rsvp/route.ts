import { connectToDatabase } from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      _id,
      guests,
      email,
      numberOfGuests,
      adults,
      kids,
      alergies,
      note,
      willBeAttending,
    } = body;

    const { db } = await connectToDatabase();
    const rsvpCollection = db.collection('rsvp');

    if (_id) {
      const result = await rsvpCollection.findOneAndUpdate(
        { email: email },
        {
          $set: {
            guests,
            numberOfGuests,
            adults,
            kids,
            alergies,
            note,
            willBeAttending,
            updatedAt: new Date(),
          },
        },
        { returnDocument: 'after' }
      );

      if (!result) {
        return new Response(JSON.stringify({ error: 'RSVP not found' }), {
          status: 404,
        });
      }

      return new Response(
        JSON.stringify({ success: true, rsvp: result.value }),
        {
          status: 200,
        }
      );
    }

    // CREATE path
    const insert = await rsvpCollection.insertOne({
      guests,
      email,
      numberOfGuests,
      adults,
      kids,
      alergies,
      note,
      willBeAttending,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const created = await rsvpCollection.findOne({ _id: insert.insertedId });

    return new Response(JSON.stringify({ success: true, rsvp: created }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to save RSVP',
        details: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
