import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Please add your Mongo URI to .env.local');

const client = new MongoClient(uri);

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export const clientPromise =
  global._mongoClientPromise ?? (global._mongoClientPromise = client.connect());

export async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db('wedding');
    return { db, client };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
