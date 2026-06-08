import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { SearchX } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FallbackSpinner } from '@/components/ui/fallback-spinner';

import { ReviewForm } from '@/modules/reviews/components/review-form';
import { reviewKeys } from '@/modules/reviews/review.key';
import { reviewMutationOptions } from '@/modules/reviews/review.mutation';
import { reviewQueryOptions } from '@/modules/reviews/review.query';

import { hasPermissionPage } from '@/utils/auth/has-permission';
import { formatDateTime } from '@/utils/utils';

export const Route = createFileRoute('/_layout-dashboard/app/reviews/$reviewId/edit')({
  component: ReviewsEditPage,
  beforeLoad: ({ context }) => {
    hasPermissionPage(context, 'update', 'Review');
  },
});

function ReviewsEditPage() {
  const navigate = useNavigate({ from: '/app/reviews/$reviewId/edit' });
  const queryClient = useQueryClient();
  const { reviewId } = Route.useParams();

  const reviewQuery = useQuery({
    ...reviewQueryOptions.getById(reviewId),
  });

  const updateMutation = useMutation({
    ...reviewMutationOptions.update(reviewId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reviewKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: reviewKeys.detail(reviewId) }),
      ]);

      toast.success('Review updated successfully');
      navigate({ to: '/app/reviews' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update review');
    },
  });

  if (reviewQuery.isError) {
    return (
      <Card className='rounded-2xl'>
        <CardContent className='flex min-h-64 flex-col items-center justify-center gap-3 text-center'>
          <SearchX className='size-7 text-muted-foreground' />
          <p className='font-medium'>Unable to load review details.</p>
          <Button variant='outline' onClick={() => reviewQuery.refetch()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (reviewQuery.isPending || !reviewQuery.data) {
    return <FallbackSpinner fullscreen />;
  }

  const review = reviewQuery.data;

  return (
    <div className='space-y-4'>
      <Card className='rounded-2xl shadow-sm'>
        <CardContent>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>Reviews</p>
            <h1 className='text-2xl font-semibold tracking-tight'>Edit Review</h1>
            <p className='max-w-2xl text-sm text-muted-foreground'>
              Update moderation status and review content while preserving data consistency.
            </p>
          </div>

          <div className='mt-4 grid gap-3 md:grid-cols-2'>
            <div className='rounded-lg border bg-muted/20 p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Patient</p>
              <p className='mt-1 text-sm font-medium'>{review.patient.fullName}</p>
            </div>
            <div className='rounded-lg border bg-muted/20 p-3'>
              <p className='text-xs uppercase tracking-wide text-muted-foreground'>Created At</p>
              <p className='mt-1 text-sm font-medium'>{formatDateTime(review.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ReviewForm
        initialValue={review}
        isSubmitting={updateMutation.isPending}
        onSubmit={(payload) => updateMutation.mutate(payload)}
      />

      <Button type='button' variant='outline' onClick={() => navigate({ to: '/app/reviews' })}>
        Back to Reviews List
      </Button>
    </div>
  );
}
