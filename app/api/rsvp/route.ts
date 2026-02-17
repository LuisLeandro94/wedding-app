import { sendRsvpConfirmationEmail } from '@/app/lib/email';
import { connectToDatabase } from '@/app/lib/mongodb';

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
        { returnDocument: 'after' },
      );

      if (!result) {
        return new Response(JSON.stringify({ error: 'RSVP not found' }), {
          status: 404,
        });
      }

      const previous = await rsvpCollection.findOne({ email });
      const nextValues = { numberOfGuests, willBeAttending, adults, kids };

      const meaningful = hasMeaningfulRsvpChanges(previous, nextValues);

      if (email && meaningful) {
        try {
          await sendRsvpConfirmationEmail({
            to: email,
            guests,
            willBeAttending,
            numberOfGuests,
            adults,
            kids,
            note,
          });
        } catch (err) {
          console.error('RSVP email failed:', err);
        }
      }

      return new Response(
        JSON.stringify({ success: true, rsvp: result.value }),
        {
          status: 200,
        },
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

    if (email) {
      try {
        await sendRsvpConfirmationEmail({
          to: email,
          guests,
          willBeAttending,
          numberOfGuests,
          adults,
          kids,
          note,
        });
      } catch (err) {
        console.error('RSVP email failed:', err);
      }
    }

    return new Response(JSON.stringify({ success: true, rsvp: created }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to save RSVP',
        details: (error as Error).message,
      }),
      { status: 500 },
    );
  }
}

function hasMeaningfulRsvpChanges(prev: any, next: any) {
  const normNum = (v: any) => (v === undefined || v === null ? 0 : Number(v));
  const normBool = (v: any) => Boolean(v);

  return (
    normNum(prev?.numberOfGuests) !== normNum(next?.numberOfGuests) ||
    normBool(prev?.willBeAttending) !== normBool(next?.willBeAttending) ||
    normNum(prev?.adults) !== normNum(next?.adults) ||
    normNum(prev?.kids) !== normNum(next?.kids)
  );
}
