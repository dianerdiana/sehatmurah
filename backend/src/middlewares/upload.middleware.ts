import fs from 'fs';
import multer from 'multer';
import path from 'path';

import { ApiError } from '../common/api-error';
import { env } from '../config/env';
import { uploadDir } from '../utils/upload-dir';

const allowedMimeTypes = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    let subFolder = '';

    if (file.fieldname === 'icon') {
      subFolder = 'icons';
    } else if (file.fieldname === 'image') {
      subFolder = 'images';
    }

    const targetDir = path.resolve(uploadDir, subFolder);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    callback(null, targetDir);
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
