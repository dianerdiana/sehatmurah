import { useMemo } from 'react';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useAppForm } from '@/utils/hooks/use-app-form';

import { ReviewStatus } from '@/types/enums/review-status.enum';

import { type UpdateReviewDto, updateReviewSchema } from '../review.schema';
import type { Review } from '../review.type';

type ReviewFormProps = {
  initialValue: Review;
  isSubmitting: boolean;
  onSubmit: (payload: UpdateReviewDto) => void;
};

type FormValues = {
  rating: string;
  comment: string;
  status: ReviewStatus;
};

const buildDefaultValues = (value: Review): FormValues => ({
  rating: String(value.rating),
  comment: value.comment ?? '',
  status: value.status,
});

export function ReviewForm({ initialValue, isSubmitting, onSubmit }: ReviewFormProps) {
  const subtitle = useMemo(() => {
    return 'Update review status, rating, and comment details.';
  }, []);

  const form = useAppForm({
    defaultValues: buildDefaultValues(initialValue),
    onSubmit: ({ value }) => {
      const payload: UpdateReviewDto = {};

      const nextRating = Number(value.rating);
      if (!Number.isNaN(nextRating) && nextRating !== initialValue.rating) {
        payload.rating = nextRating;
      }

      const nextComment = value.comment.trim();
      const previousComment = (initialValue.comment ?? '').trim();
      if (nextComment !== previousComment) {
        payload.comment = nextComment;
      }

      if (value.status !== initialValue.status) {
        payload.status = value.status;
      }

      const parsed = updateReviewSchema.safeParse(payload);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? 'Validation error');
        return;
      }

      onSubmit(parsed.data);
    },
  });

  return (
    <Card className='rounded-2xl shadow-sm'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Edit Review</CardTitle>
        <p className='text-sm text-muted-foreground'>{subtitle}</p>
      </CardHeader>
      <CardContent>
        <form
          className='grid gap-5'
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className='grid gap-4 md:grid-cols-2'>
              <form.Field
                name='rating'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='review-rating'>Rating</FieldLabel>
                    <Input
                      id='review-rating'
                      type='number'
                      min={1}
                      max={5}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                  </Field>
                )}
              />

              <form.Field
                name='status'
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor='review-status'>Status</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value as ReviewStatus)}
                    >
                      <SelectTrigger id='review-status'>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ReviewStatus.PENDING}>Pending</SelectItem>
                        <SelectItem value={ReviewStatus.APPROVED}>Approved</SelectItem>
                        <SelectItem value={ReviewStatus.REJECTED}>Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                  </Field>
                )}
              />
            </div>

            <form.Field
              name='comment'
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor='review-comment'>Comment</FieldLabel>
                  <Textarea
                    id='review-comment'
                    value={field.state.value}
                    rows={5}
                    placeholder='Write review comment'
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {!field.state.meta.isValid && <FieldError>{String(field.state.meta.errors?.[0] ?? '')}</FieldError>}
                </Field>
              )}
            />

            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([formSubmitting]) => (
                <div className='flex flex-wrap gap-2'>
                  <Button type='submit' disabled={isSubmitting || formSubmitting}>
                    {isSubmitting || formSubmitting ? <Loader2 className='size-4 animate-spin' /> : null}
                    Save Changes
                  </Button>
                </div>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
