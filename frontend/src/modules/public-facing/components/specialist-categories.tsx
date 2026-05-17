import { useQuery } from '@tanstack/react-query';

import { getSpecialists } from '../public-facing.api';

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

export function SpecialistCategories() {
  const { data, isPending } = useQuery({
    queryKey: ['specialists', 'categories'],
    queryFn: () => getSpecialists({ limit: 6 }),
  });

  if (isPending) {
    return <SpecialistCategoriesSekeleton />;
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
