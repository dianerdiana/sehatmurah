import path from 'path';

import { env } from '../config/env';

export const uploadDir = path.resolve(process.cwd(), env.uploadDir);
