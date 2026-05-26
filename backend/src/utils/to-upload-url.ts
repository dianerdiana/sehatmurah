import { env } from '../config/env';

export const toUploadUrl = (filename: string): string => {
  const base = env.uploadBaseUrl.endsWith('/') ? env.uploadBaseUrl.slice(0, -1) : env.uploadBaseUrl;
  return `${base}/${filename}`;
};
