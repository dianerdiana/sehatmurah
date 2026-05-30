import type { Request } from 'express';

import { deleteUploadFile } from './delete-upload-file';

export const getUploadedFilesFromRequest = (req: Request, allowedFields?: string[]): string[] => {
  const uploadedFiles = req.uploadedFiles;

  if (!uploadedFiles) {
    return [];
  }

  const fields =
    allowedFields && allowedFields.length > 0 ? allowedFields : Object.keys(uploadedFiles);

  const filePaths = fields.flatMap((field) => uploadedFiles[field] ?? []);

  return Array.from(new Set(filePaths));
};

export const getFirstUploadedFileByField = (req: Request, field: string): string | undefined => {
  const uploadedFiles = req.uploadedFiles;

  if (!uploadedFiles) {
    return undefined;
  }

  return uploadedFiles[field]?.[0];
};

export const cleanupUploadedFilesFromRequest = async (
  req: Request,
  allowedFields?: string[],
): Promise<void> => {
  const filePaths = getUploadedFilesFromRequest(req, allowedFields);

  await Promise.all(filePaths.map((filePath) => deleteUploadFile(filePath)));
};
