import { useQuery } from '@tanstack/react-query';

import { getSpecialists } from '../public-facing.api';

function GridSpecialistsSekeleton() {
  return (
    <section id='categories-skeleton' className='rounded-3xl bg-white px-4 py-8 animate-pulse'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        {/* Title Placeholder */}
        <div className='h-6.25 w-44 rounded-md bg-gray-300'></div>
        {/* "View All" Link Placeholder */}
        <div className='h-4.25 w-14 rounded-md bg-gray-200'></div>
      </div>

      {/* Grid Items Skeleton */}
      <div className='grid grid-cols-3 justify-items-center gap-y-4 pt-4'>
        {[...Array(6)].map((_, index) => (
          <div key={index} className='h-25.5 w-27.75 flex flex-col items-center'>
            {/* Image/Icon Circle Placeholder */}
            <div className='size-18 rounded-3xl bg-gray-200'></div>
            {/* Text/Label Placeholder */}
            <div className='mt-2.5 h-4 w-16 rounded bg-gray-200'></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GridSpecialists() {
  const { data, isPending } = useQuery({
    queryKey: ['specialists'],
    queryFn: getSpecialists,
  });

  if (isPending) {
    return <GridSpecialistsSekeleton />;
  }

  return (
    <section id='categories' className='rounded-3xl bg-white px-4 py-8'>
      <div className='flex items-center justify-between'>
        <h2 className='font-jakarta text-[20px] font-bold leading-[25.2px] text-gray-900'>Specialist Categories</h2>
        <a href='search-result' className='font-jakarta text-sm font-bold leading-[17.64px] text-gray-500'>
          View All
        </a>
      </div>
      <div className='grid grid-cols-3 justify-items-center gap-y-4 pt-4'>
        {data &&
          data.status === 'success' &&
          data.data.map((specialist) => (
            <a key={specialist._id} href='search-result' className='categori-1 h-25.5 w-27.75'>
              <div className='mx-auto flex size-18 items-center justify-center overflow-hidden rounded-3xl'>
                <img src={specialist.image} alt='Image' className='h-full w-full object-cover' />
              </div>
              <h3 className='mt-2.5 text-center font-jakarta font-semibold leading-[20.16px] text-gray-500'>
                {specialist.name}
              </h3>
            </a>
          ))}
      </div>
    </section>
  );
}
