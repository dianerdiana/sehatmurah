import type { NextFunction, Request, Response } from 'express';

export const mapFilesToBody = async (req: Request, _res: Response, next: NextFunction) => {
  if (req.files && typeof req.files === 'object' && !Array.isArray(req.files)) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Jika ada file icon, simpan dengan format: icons/nama-file.png
    if (files['icon'] && files['icon'][0]) {
      req.body.icon = `icons/${files['icon'][0].filename}`;
    }

    // Jika ada file image, simpan dengan format: images/nama-file.png
    if (files['image'] && files['image'][0]) {
      req.body.image = `images/${files['image'][0].filename}`;
    }
  }

  next();
};
