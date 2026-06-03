import mongoose from 'mongoose';

import { env } from './env';

let cachedDb: Promise<typeof mongoose> | null = null;

export const connectDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!cachedDb) {
    cachedDb = mongoose.connect(env.mongoUri).catch((err) => {
      cachedDb = null;
      throw err;
    });
  }

  await cachedDb;
};

