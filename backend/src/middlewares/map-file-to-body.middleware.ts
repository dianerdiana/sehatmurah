import type { NextFunction, Request, Response } from 'express';

export const mapFilesToBody = async (req: Request, _res: Response, next: NextFunction) => {
  if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const uploadedFiles: Record<string, string[]> = {};

    if (files['icon']?.length) {
      uploadedFiles.icon = files['icon'].map((file) => `icons/${file.filename}`);
    }

    if (files['image']?.length) {
      uploadedFiles.image = files['image'].map((file) => `images/${file.filename}`);
    }

    if (files['profilePhoto']?.length) {
      uploadedFiles.profilePhoto = files['profilePhoto'].map((file) => `doctors/${file.filename}`);
    }

    req.uploadedFiles = uploadedFiles;

    // Jika ada file icon, simpan dengan format: icons/nama-file.png
    if (uploadedFiles.icon?.[0]) {
      req.body.icon = uploadedFiles.icon[0];
    }

    // Jika ada file image, simpan dengan format: images/nama-file.png
    if (uploadedFiles.image?.[0]) {
      req.body.image = uploadedFiles.image[0];
    }

    if (uploadedFiles.profilePhoto?.[0]) {
      req.body.profilePhoto = uploadedFiles.profilePhoto[0];
    }
  }

  next();
};
