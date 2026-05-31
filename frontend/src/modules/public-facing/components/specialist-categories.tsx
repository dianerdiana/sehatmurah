import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { ImageServer } from '@/components/image-server';

import { specialistQueryOptions } from '@/modules/specialists/specialist.query';

export function SpecialistCategories() {
  const querySpecialists = useQuery(
    specialistQueryOptions.list({
      limit: 6,
      page: 1,
      isActive: 'true',
      column: 'sortOrder',
      sort: 'asc',
    }),
  );

  const specialists = querySpecialists.data ? querySpecialists.data.items : [];

  if (querySpecialists.isPending) {
    return <SpecialistCategoriesSekeleton />;
  }

  return (
    <section id='categories' className='rounded-3xl bg-white px-4 py-8'>
      <div className='flex items-center justify-between'>
        <h2 className='font-jakarta text-[20px] font-bold leading-[25.2px] text-gray-900'>Specialist Categories</h2>
        <Link
          to='/doctors/results'
          search={{ specialist: '', city: '' }}
          className='font-jakarta text-sm font-bold leading-[17.64px] text-gray-500'
        >
          View All
        </Link>
      </div>
      <div className='grid grid-cols-3 justify-items-center gap-y-4 pt-4'>
        {specialists &&
          specialists.map((specialist) => (
            <Link
              key={specialist._id}
              to='/doctors/results'
              search={{ specialist: specialist.name }}
              className='categori-1 h-25.5 w-27.75'
            >
              <div className='mx-auto flex size-18 items-center justify-center overflow-hidden rounded-3xl'>
                <ImageServer src={specialist.image} alt='Image' className='h-full w-full object-cover' />
              </div>
              <h3 className='mt-2.5 text-center font-jakarta font-semibold leading-[20.16px] text-gray-500'>
                {specialist.name}
              </h3>
            </Link>
          ))}
      </div>
    </section>
  );
}

function SpecialistCategoriesSekeleton() {
  return (
    <section id='categories-skeleton' className='rounded-3xl bg-white mx-4 px-4 py-8 animate-pulse'>
      <div className='flex items-center justify-between'>
        <div className='h-6.25 w-44 rounded-md bg-gray-300'></div>
        <div className='h-4.25 w-14 rounded-md bg-gray-200'></div>
      </div>

      <div className='grid grid-cols-3 justify-items-center gap-y-4 pt-4'>
        {[...Array(6)].map((_, index) => (
          <div key={index} className='h-25.5 w-27.75 flex flex-col items-center'>
            <div className='size-18 rounded-3xl bg-gray-200'></div>
            <div className='mt-2.5 h-4 w-16 rounded bg-gray-200'></div>
          </div>
        ))}
      </div>
    </section>
  );
}
