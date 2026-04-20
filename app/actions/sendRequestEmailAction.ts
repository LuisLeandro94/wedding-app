'use server';

import { sendRequestEmail } from '@/app/lib/email';

type SendRequestEmailActionArgs = {
  description: string;
  email: string;
};

export async function sendRequestEmailAction({
  description,
  email,
}: SendRequestEmailActionArgs) {
  if (!description?.trim()) {
    throw new Error('Description is required.');
  }

  await sendRequestEmail({
    description: description.trim(),
    email,
  });

  return { success: true };
}
