import { createFileRoute } from '@tanstack/react-router';

import { PublicFacingLayout } from '@/layouts/public-facing-layout';

import { HomeHeader } from '@/modules/public-facing/components/home-header';
import { RecommendedDoctors } from '@/modules/public-facing/components/recommended-doctors';
import { SpecialistCategories } from '@/modules/public-facing/components/specialist-categories';

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
  return (
    <PublicFacingLayout>
      <HomeHeader />
      <SpecialistCategories />
      <RecommendedDoctors />
    </PublicFacingLayout>
  );
}
