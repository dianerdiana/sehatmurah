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

export const deleteFolderRecursive = async (folderPath: string): Promise<void> => {
  try {
    const absolutePath = resolveUploadAbsolutePath(folderPath);
    if (!absolutePath) return;

    await fs.promises.rm(absolutePath, { recursive: true, force: true });
    console.log(`Folder ${folderPath} berhasil dihapus.`);
  } catch (error) {
    console.error(`Gagal menghapus folder: ${(error as Error).message}`);
    throw error;
  }
};
