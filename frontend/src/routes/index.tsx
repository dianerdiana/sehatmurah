import { createFileRoute } from '@tanstack/react-router';

import { PublicFacingLayout } from '@/layouts/public-facing-layout';
import { GridSpecialists } from '@/modules/public-facing/components/grid-specialists';
import { HomeHeader } from '@/modules/public-facing/components/home-header';
import { RecommendedDoctors } from '@/modules/public-facing/components/recommended-doctors';

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
  return (
    <PublicFacingLayout>
      <HomeHeader />
      <GridSpecialists />
      <RecommendedDoctors />
    </PublicFacingLayout>
  );
}
