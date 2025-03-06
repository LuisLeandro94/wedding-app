'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Guest = {
  id: number;
  name: string;
  numberOfGuests: number;
  qrCodeString: string;
  willBeAttending: boolean | null;
};


export default function GuestPage() {
  const router = useRouter();
  const { id } = router.query;
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchGuest() {
      try {
        const response = await fetch('/data/guests.json');
        const guests: Guest[] = await response.json();
        const foundGuest = guests.find((g) => g.id === Number(id));
        if (!foundGuest) throw new Error('Guest not found');
        setGuest(foundGuest);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchGuest();
  }, [id]);

  const handleRSVP = async (willAttend: boolean) => {
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestId: Number(id),
          willBeAttending: willAttend,
        }),
      });

      if (response.ok) {
        setGuest((prevGuest) =>
          prevGuest ? { ...prevGuest, willBeAttending: willAttend } : null
        );
      } else {
        throw new Error('Failed to update RSVP');
      }
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!guest) return <p>Guest not found.</p>;

  return (
    <div>
      <h1>Welcome, {guest.name}!</h1>
      <p>Will you be attending the wedding?</p>
      <button onClick={() => handleRSVP(true)}>Yes, I will attend</button>
      <button onClick={() => handleRSVP(false)}>No, I can&apos;t make it</button>
      {guest.willBeAttending !== null && (
        <p>
          Thank you! Your response has been saved:{' '}
          {guest.willBeAttending ? 'Attending' : 'Not Attending'}
        </p>
      )}
    </div>
  );
}
