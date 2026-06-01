import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { appointmentQueryOptions } from '@/modules/appointments/appointment.query';
import { ReviewCreateForm } from '@/modules/reviews/components/review-create-form';
import { reviewQueryOptions } from '@/modules/reviews/review.query';

import { getPartyId } from '@/utils/appointment-party';

export const Route = createFileRoute('/_layout-public-nav/reviews/$appointmentId/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const { appointmentId } = Route.useParams();

  const queryAppointment = useQuery(appointmentQueryOptions.getById(appointmentId));
  const queryReview = useQuery({
    ...reviewQueryOptions.getByAppointmentId(appointmentId),
    enabled: !!appointmentId,
  });

  const doctorId = getPartyId(queryAppointment.data?.doctor) || '';
  const existingReview = queryReview.data || null;

  return (
    <div className='container py-10'>
      <ReviewCreateForm review={existingReview} doctorId={doctorId} appointmentId={appointmentId} />
    </div>
  );
}
