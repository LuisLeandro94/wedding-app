// app/lib/auth.ts
import { clientPromise } from '@/app/lib/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'database' },
  debug: true,
  logger: {
    error(code, ...message) {
      console.error('[NextAuth][error]', code, ...message);
    },
  },
};
