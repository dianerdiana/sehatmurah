import fs from 'fs';
import path from 'path';

import { uploadDir } from './upload-dir';

const allowedUploadFolders = new Set(['icons', 'images', 'doctors']);

const normalizeRelativePath = (relativePath: string): string | null => {
  if (!relativePath) return null;

  const normalized = path.posix.normalize(relativePath.replace(/\\/g, '/')).replace(/^\/+/, '');

  if (!normalized || normalized.includes('..') || path.isAbsolute(normalized)) {
    return null;
  }

  const [folder] = normalized.split('/');

  if (!folder || !allowedUploadFolders.has(folder)) {
    return null;
  }

  return normalized;
};

export const resolveUploadAbsolutePath = (relativePath: string): string | null => {
  const normalizedPath = normalizeRelativePath(relativePath);

  if (!normalizedPath) return null;

  const baseDir = path.resolve(uploadDir);
  const resolvedPath = path.resolve(baseDir, normalizedPath);

  if (resolvedPath !== baseDir && !resolvedPath.startsWith(`${baseDir}${path.sep}`)) {
    return null;
  }

  return resolvedPath;
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
