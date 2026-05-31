import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { RecommendedDoctors } from '@/modules/public-facing/components/recommended-doctors';
import {
  SpecialistCategoryItem,
  SpecialistCategorySkeleton,
} from '@/modules/specialists/components/specialist-category-item';
import { specialistQueryOptions } from '@/modules/specialists/specialist.query';

export const Route = createFileRoute('/_layout-public-nav/')({
  component: HomePage,
});

function HomePage() {
  const querySpecialists = useQuery(
    specialistQueryOptions.list({
      limit: 10,
      page: 1,
      isActive: 'true',
      column: 'sortOrder',
      sort: 'asc',
    }),
  );

  const specialists = querySpecialists.data ? querySpecialists.data.items : [];

  return (
    <React.Fragment>
      <header>
        <div className='flex items-center justify-between rounded-b-3xl border border-gray-200 bg-white px-4 pb-8 pt-12'>
          <Link to='/'>
            <img src='/assets/image/homepage-nav-company.png' alt='Image' className='max-h-12.5' />
          </Link>
          <a
            href='#'
            className='flex size-12.5 items-center justify-center shrink-0 rounded-full border border-gray-200'
          >
            <img src='/assets/icons/homepage-nav-notification.svg' alt='Icon' />
          </a>
        </div>
        <img
          src='/assets/image/homepage-header-banner.png'
          alt='Image'
          className='mx-auto min-h-45.75 min-w-90.25 p-4'
        />
      </header>

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
          {querySpecialists.isPending
            ? [...Array(6)].map((_, idx) => <SpecialistCategorySkeleton key={idx} />)
            : specialists
                .filter((_specialist, idx) => idx < 6)
                .map((specialist) => <SpecialistCategoryItem specialist={specialist} key={specialist._id} />)}
        </div>
      </section>
      <RecommendedDoctors />
    </React.Fragment>
  );
}
