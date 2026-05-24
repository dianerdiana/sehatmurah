import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AppointmentsTablePaginationProps = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function AppointmentsTablePagination({
  page,
  limit,
  totalItems,
  totalPages,
  onPageChange,
  onLimitChange,
}: AppointmentsTablePaginationProps) {
  const safeTotalPages = Math.max(totalPages ?? 0, totalItems > 0 ? Math.ceil(totalItems / limit) : 0);
  const canGoPrevious = page > 1;
  const canGoNext = safeTotalPages > 0 ? page < safeTotalPages : false;

  return (
    <Card className='rounded-xl shadow-sm py-4'>
      <CardContent className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground'>Rows per page</span>
          <Select value={String(limit)} onValueChange={(value) => onLimitChange(Number(value))}>
            <SelectTrigger className='w-24'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <p className='text-sm text-muted-foreground'>
            {totalItems === 0 ? 'No appointment data available' : `${totalItems} total appointments`}
          </p>
          <span className='hidden h-4 w-px bg-border lg:block' />
          <p className='text-sm text-muted-foreground'>
            Page {safeTotalPages === 0 ? 0 : page} of {safeTotalPages}
          </p>
          <div className='ml-auto flex items-center gap-2 lg:ml-0'>
            <Button variant='outline' size='sm' onClick={() => onPageChange(page - 1)} disabled={!canGoPrevious}>
              <ChevronLeft className='size-4' />
              Previous
            </Button>
            <Button variant='outline' size='sm' onClick={() => onPageChange(page + 1)} disabled={!canGoNext}>
              Next
              <ChevronRight className='size-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
