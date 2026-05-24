import { createFileRoute } from '@tanstack/react-router';

import { HomeHeader } from '@/modules/public-facing/components/home-header';
import { RecommendedDoctors } from '@/modules/public-facing/components/recommended-doctors';
import { SpecialistCategories } from '@/modules/public-facing/components/specialist-categories';

export const Route = createFileRoute('/_layout-public-nav/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HomeHeader />
      <SpecialistCategories />
      <RecommendedDoctors />
    </>
  );
}
