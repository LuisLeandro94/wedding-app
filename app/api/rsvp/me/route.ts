export const dynamic = 'force-dynamic';

import { connectToDatabase } from '@/app/lib/mongodb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { db } = await connectToDatabase();
  const rsvpCollection = db.collection('rsvp');

  const rsvp = await rsvpCollection.findOne({ email: session.user.email });

  return NextResponse.json({ exists: Boolean(rsvp), rsvp });
}
