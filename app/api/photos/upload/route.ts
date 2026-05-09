/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,

      onBeforeGenerateToken: async () => {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
          throw new Error('Unauthorized');
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: MAX_FILE_SIZE,
          tokenPayload: JSON.stringify({
            guestMail: session.user.email,
            guestName: session.user.name,
          }),
        };
      },

      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = JSON.parse(tokenPayload || '{}');

        const { db } = await connectToDatabase();

        const photoCollection = db.collection('photos');

        await photoCollection.insertOne({
          guestEmail: payload.guestMail,
          guestName: payload.guestName,

          url: blob.url,
          pathname: blob.pathname,
          contentType: blob.contentType,

          status: 'pending',

          createdAt: new Date(),
          updatedAt: new Date(),
        });
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 400 },
    );
  }
}
