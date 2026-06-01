import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useDebounce } from '@/utils/hooks/use-debounce';

import { ReviewStatus } from '@/types/enums/review-status.enum';

import type { ListReviewsSearchState } from '../review.schema';

type ReviewStatusFilter = ListReviewsSearchState['status'];
type ReviewRatingFilter = 'all' | '1' | '2' | '3' | '4' | '5';

type ReviewsTableToolbarProps = {
  search: string;
  status: ReviewStatusFilter;
  specialist: string;
  rating: ReviewRatingFilter;
  startDate: string;
  endDate: string;
  onSearchChange: (search: string) => void;
  onStatusChange: (value: ReviewStatusFilter) => void;
  onSpecialistChange: (specialist: string) => void;
  onRatingChange: (rating: ReviewRatingFilter) => void;
  onStartDateChange: (startDate: string) => void;
  onEndDateChange: (endDate: string) => void;
  onClearFilters: () => void;
};

export function ReviewsTableToolbar({
  search,
  status,
  specialist,
  rating,
  startDate,
  endDate,
  onSearchChange,
  onStatusChange,
  onRatingChange,
  onStartDateChange,
  onEndDateChange,
  onClearFilters,
}: ReviewsTableToolbarProps) {
  const [searchInput, setSearchInput] = useState(search);

  const debouncedSearch = useDebounce(searchInput, 350);

  useEffect(() => {
    if (debouncedSearch === search) {
      return;
    }

    onSearchChange(debouncedSearch.trim());
  }, [debouncedSearch, onSearchChange, search]);

  const hasActiveFilters = Boolean(
    search || status !== 'all' || specialist || rating !== 'all' || startDate || endDate,
  );

  return (
    <Card className='rounded-xl shadow-sm'>
      <CardContent className='grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,220px)_minmax(0,120px)_minmax(0,120px)_minmax(0,100px)_auto]'>
        <div className='space-y-2'>
          <label htmlFor='review-search' className='text-sm font-medium'>
            Search
          </label>
          <Input
            id='review-search'
            value={searchInput}
            placeholder='Search patient, doctor, specialist, comment'
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='review-status' className='text-sm font-medium'>
            Status
          </label>
          <Select value={status} onValueChange={(value) => onStatusChange(value as ReviewStatusFilter)}>
            <SelectTrigger id='review-status' className='w-full'>
              <SelectValue placeholder='All status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All status</SelectItem>
              <SelectItem value={ReviewStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={ReviewStatus.APPROVED}>Approved</SelectItem>
              <SelectItem value={ReviewStatus.REJECTED}>Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='review-rating' className='text-sm font-medium'>
            Rating
          </label>
          <Select value={rating} onValueChange={(value) => onRatingChange(value as ReviewRatingFilter)}>
            <SelectTrigger id='review-rating' className='w-full'>
              <SelectValue placeholder='All ratings' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All ratings</SelectItem>
              <SelectItem value='5'>5 Stars</SelectItem>
              <SelectItem value='4'>4 Stars</SelectItem>
              <SelectItem value='3'>3 Stars</SelectItem>
              <SelectItem value='2'>2 Stars</SelectItem>
              <SelectItem value='1'>1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='review-start-date' className='text-sm font-medium'>
            Start date
          </label>
          <Input
            id='review-start-date'
            type='date'
            value={startDate}
            onChange={(event) => onStartDateChange(event.target.value)}
            max={endDate || undefined}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='review-end-date' className='text-sm font-medium'>
            End date
          </label>
          <Input
            id='review-end-date'
            type='date'
            value={endDate}
            onChange={(event) => onEndDateChange(event.target.value)}
            min={startDate || undefined}
          />
        </div>

        <div className='flex items-end'>
          <Button
            type='button'
            variant='outline'
            className='w-full'
            disabled={!hasActiveFilters}
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
