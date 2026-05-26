import fs from 'fs';
import path from 'path';

import { uploadDir } from './upload-dir';

export const resolveUploadAbsolutePath = (relativePath: string): string | null => {
  if (!relativePath) return null;

  return path.resolve(uploadDir, relativePath);
};

export const deleteUploadFile = async (relativePath?: string): Promise<void> => {
  if (!relativePath) return;

  const absolutePath = resolveUploadAbsolutePath(relativePath);
  if (!absolutePath) return;

  try {
    await fs.promises.unlink(absolutePath);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'ENOENT') return;
    throw error;
  }
};
