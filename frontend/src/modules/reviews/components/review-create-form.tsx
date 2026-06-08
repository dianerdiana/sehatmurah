// create-review-form.tsx

import { useState } from 'react';

import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { ReviewStatus } from '@/types/enums/review-status.enum';

import { reviewMutationOptions } from '../review.mutation';
import { type CreateReviewDto, createReviewSchema } from '../review.schema';
import type { Review } from '../review.type';

type CreateReviewFormProps = {
  doctorId: string;
  appointmentId?: string;
  review?: Review | null;
};

export function ReviewCreateForm({ doctorId, appointmentId, review }: CreateReviewFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const createReviewMutation = useMutation({
    ...reviewMutationOptions.create(),
    onSuccess: () => {
      toast.success('Review created successfully.');
      navigate({ to: '/appointments' });

      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: () => {
      toast.error('Failed to submit review. Please try again.');
    },
  });

  const form = useForm({
    defaultValues: {
      doctor: doctorId,
      appointment: appointmentId,
      rating: review?.rating ?? 0,
      comment: review?.comment ?? '',
      status: review?.status ?? ReviewStatus.PENDING,
    } as CreateReviewDto,
    onSubmit: async ({ value }) => {
      const parsed = createReviewSchema.safeParse(value);

      if (!parsed.success) {
        const firstError = parsed.error.issues[0];

        toast.error(firstError?.message ?? 'Form is not valid.');
        return;
      }

      createReviewMutation.mutate(parsed.data);
    },
  });

  return (
    <Card className='mx-auto w-full max-w-xl rounded-3xl border-none shadow-none'>
      <CardHeader className='px-4 pt-4 sm:px-6 sm:pt-6'>
        <CardTitle>Give a Review</CardTitle>
        <CardDescription>Provide a rating and comment based on your consultation experience.</CardDescription>
      </CardHeader>

      <CardContent className='px-4 pb-4 sm:px-6 sm:pb-6'>
        <form
          className='space-y-6'
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name='rating'
            validators={{
              onChange: ({ value }) => {
                const result = z.number().int().min(1, 'rating is required').max(5).safeParse(value);

                return result.success ? undefined : result.error.issues[0]?.message;
              },
            }}
          >
            {(field) => {
              const selectedRating = field.state.value;
              const activeRating = hoverRating ?? selectedRating;

              return (
                <div className='space-y-2'>
                  <Label>Rating</Label>

                  <div
                    className='flex flex-wrap items-center gap-1.5 sm:gap-2'
                    onMouseLeave={() => setHoverRating(null)}
                  >
                    {Array.from({ length: 5 }, (_, index) => {
                      const ratingValue = index + 1;
                      const isActive = ratingValue <= activeRating;

                      return (
                        <button
                          key={ratingValue}
                          type='button'
                          aria-label={`Select rating ${ratingValue}`}
                          className='rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                          onMouseEnter={() => setHoverRating(ratingValue)}
                          onClick={() => field.handleChange(ratingValue)}
                        >
                          <Star
                            className={[
                              'size-7 transition-colors sm:size-8',
                              isActive ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground',
                            ].join(' ')}
                          />
                        </button>
                      );
                    })}

                    <span className='ml-1 text-sm text-muted-foreground sm:ml-2'>
                      {selectedRating > 0 ? `${selectedRating}/5` : 'No rating yet'}
                    </span>
                  </div>

                  {field.state.meta.errors.length > 0 && (
                    <p className='text-sm text-destructive'>{field.state.meta.errors[0]}</p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name='comment'
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .trim()
                  .max(1000, 'comment must be at most 1000 characters')
                  .optional()
                  .safeParse(value);

                return result.success ? undefined : result.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className='space-y-2'>
                <Label htmlFor={field.name}>Comment</Label>

                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? ''}
                  placeholder='Write your comment...'
                  rows={5}
                  maxLength={1000}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />

                <div className='flex items-center justify-between gap-2'>
                  {field.state.meta.errors.length > 0 ? (
                    <p className='text-sm text-destructive'>{field.state.meta.errors[0]}</p>
                  ) : (
                    <span />
                  )}

                  <p className='text-xs text-muted-foreground'>{(field.state.value ?? '').length}/1000</p>
                </div>
              </div>
            )}
          </form.Field>

          <Button type='submit' className='w-full' disabled={createReviewMutation.isPending}>
            {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
