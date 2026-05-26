import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';

import { HttpResponse } from './common/http-response';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { appointmentRouter } from './modules/appointments/appointment.routes';
import { authRouter } from './modules/auth/auth.routes';
import { doctorRouter } from './modules/doctors/doctor.routes';
import { patientRouter } from './modules/patients/patient.routes';
import { reviewRouter } from './modules/reviews/review.routes';
import { specialistRouter } from './modules/specialists/specialist.routes';
import { uploadDir } from './utils/upload-dir';

export const app = express();

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Static Path
const uploadPath = path.join(__dirname, '../uploads');

app.use(cors());
app.use(express.json());
app.use(express.static(uploadPath));

app.get('/health', (_req, res) => {
  res.json(
    HttpResponse.success({
      message: 'Health check ok',
      data: { status: 'ok' },
    }),
  );
});

app.use('/api/auth', authRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/patients', patientRouter);
app.use('/api/specialists', specialistRouter);
app.use('/api/reviews', reviewRouter);

app.use(notFoundHandler);
app.use(errorHandler);
