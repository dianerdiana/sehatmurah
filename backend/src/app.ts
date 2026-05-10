import cors from 'cors';
import express from 'express';
import { HttpResponse } from './common/http-response';
import { authRouter } from './modules/auth/auth.routes';
import { doctorRouter } from './modules/doctors/doctor.routes';
import { appointmentRouter } from './modules/appointments/appointment.routes';
import { patientRouter } from './modules/patients/patient.routes';
import { specialistRouter } from './modules/specialists/specialist.routes';
import { reviewRouter } from './modules/reviews/review.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

export const app = express();

app.use(cors());
app.use(express.json());

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
