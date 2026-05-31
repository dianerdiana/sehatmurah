import { Link } from '@tanstack/react-router';

import { ImageServer } from '@/components/ui/image-server';

import type { Specialist } from '../specialist.type';

export function SpecialistCategoryItem({ specialist }: { specialist: Specialist }) {
  return (
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
  );
}

export function SpecialistCategorySkeleton() {
  return (
    <div className='h-25.5 w-27.75 flex flex-col items-center'>
      <div className='size-18 rounded-3xl bg-gray-200'></div>
      <div className='mt-2.5 h-4 w-16 rounded bg-gray-200'></div>
    </div>
  );
}
