import { Guest } from '@/public/guestList';
import fs from 'fs';
import path from 'path';

const guestsFilePath = path.join(process.cwd(), 'data/guests.json');

function readGuests() {
  if (!fs.existsSync(guestsFilePath)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(guestsFilePath, 'utf8'));
}

function writeGuests(guests: Guest[]) {
  fs.writeFileSync(guestsFilePath, JSON.stringify(guests, null, 2), 'utf8');
}

export async function POST(req: Request) {
  try {
    const { guestId, willBeAttending } = await req.json();
    const guests = readGuests();

    // Find guest
    const guestIndex = guests.findIndex((g: Guest) => g.id === guestId);
    if (guestIndex === -1) {
      return new Response(JSON.stringify({ error: 'Guest not found' }), {
        status: 404,
      });
    }

    // Update attendance status
    guests[guestIndex].willBeAttending = willBeAttending;
    writeGuests(guests);

    return new Response(
      JSON.stringify({ success: true, guest: guests[guestIndex] }),
      { status: 200 }
    );
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
