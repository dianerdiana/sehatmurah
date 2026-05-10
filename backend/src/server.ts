import { connectDatabase } from './config/database';
import { env } from './config/env';
import { app } from './app';

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });
};

startServer().catch((error: unknown) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
