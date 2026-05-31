import { createFileRoute } from '@tanstack/react-router';

import { FormSearchDoctor } from '@/modules/public-facing/components/form-search-doctor';

export const Route = createFileRoute('/_layout-public-nav/doctors/search')({
  component: DoctorSearchPage,
});

function DoctorSearchPage() {
  return (
    <div className='pt-4'>
      <FormSearchDoctor />
    </div>
  );
}
