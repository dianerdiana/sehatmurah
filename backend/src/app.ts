import cors from 'cors';
import express from 'express';
import path from 'path';

import { HttpResponse } from './common/http-response';
import { connectDatabase } from './config/database';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { appointmentRouter } from './modules/appointments/appointment.routes';
import { authRouter } from './modules/auth/auth.routes';
import { dashboardRouter } from './modules/dashboard/dashboard.routes';
import { doctorRouter } from './modules/doctors/doctor.routes';
import { patientRouter } from './modules/patients/patient.routes';
import { reviewRouter } from './modules/reviews/review.routes';
import { specialistRouter } from './modules/specialists/specialist.routes';
import { userRouter } from './modules/users/user.routes';

const app = express();

// Database connection middleware for serverless environment
app.use(async (_req, _res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

// Static Path
const uploadPath = path.join(process.cwd(), 'uploads');

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
app.use('/api/dashboard', dashboardRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/patients', patientRouter);
app.use('/api/specialists', specialistRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/users', userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
export default app;
