import { queryOptions } from '@tanstack/react-query';

import { getDoctors } from './public-facing.api';

export function getDoctorsOption() {
  return queryOptions({
    queryKey: ['doctors'],
    queryFn: () => getDoctors({}),
  });
}
