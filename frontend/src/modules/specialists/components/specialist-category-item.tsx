import { Link } from '@tanstack/react-router';

import { ImageServer } from '@/components/ui/image-server';

import type { Specialist } from '../specialist.type';

export function SpecialistCategoryItem({ specialist }: { specialist: Specialist }) {
  return (
    <Link
      title={specialist.name}
      key={specialist._id}
      to='/doctors/results'
      search={{ specialist: specialist.name }}
      className='categori-1 flex h-24 w-full max-w-28 flex-col items-center sm:h-25.5 sm:max-w-27.75'
    >
      <div className='mx-auto flex size-16 items-center justify-center overflow-hidden rounded-3xl sm:size-18'>
        <ImageServer src={specialist.image} alt='Image' className='h-full w-full object-cover' />
      </div>
      <h3 className='mt-2 text-center line-clamp-1 text-sm font-semibold leading-[20.16px] text-gray-500 sm:mt-2.5 sm:text-base'>
        {specialist.name}
      </h3>
    </Link>
  );
}

export function SpecialistCategorySkeleton() {
  return (
    <div className='flex h-24 w-full max-w-28 flex-col items-center sm:h-25.5 sm:max-w-27.75'>
      <div className='size-16 rounded-3xl bg-gray-200 sm:size-18'></div>
      <div className='mt-2 h-4 w-16 rounded bg-gray-200 sm:mt-2.5'></div>
    </div>
  );
}
