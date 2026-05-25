import fs from 'fs';
import path from 'path';

import multer from 'multer';

import { ApiError } from '../common/api-error';
import { env } from '../config/env';

const uploadDir = path.resolve(process.cwd(), env.uploadDir);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedMimeTypes = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname || '').toLowerCase();
    const sanitizedExt = extension && extension.length <= 6 ? extension : '';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${sanitizedExt}`;
    callback(null, uniqueName);
  },
});

const fileFilter: multer.Options['fileFilter'] = (_req, file, callback) => {
  if (!allowedMimeTypes.has(file.mimetype)) {
    callback(new ApiError(400, 'Invalid file type. Allowed types: png, jpg, jpeg, webp, svg'));
    return;
  }

  callback(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.uploadMaxFileSizeMb * 1024 * 1024,
  },
});

export const toUploadUrl = (filename: string): string => {
  const base = env.uploadBaseUrl.endsWith('/') ? env.uploadBaseUrl.slice(0, -1) : env.uploadBaseUrl;
  return `${base}/${filename}`;
};
