import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useDebounce } from '@/utils/hooks/use-debounce';

export type DoctorStatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

type SpecialistOption = {
  id: string;
  name: string;
};

type DoctorsTableToolbarProps = {
  search: string;
  specialist: string;
  status: DoctorStatusFilter;
  specialistOptions: SpecialistOption[];
  onSearchChange: (search: string) => void;
  onSpecialistChange: (specialist: string) => void;
  onStatusChange: (status: DoctorStatusFilter) => void;
  onClearFilters: () => void;
};

export function DoctorsTableToolbar({
  search,
  specialist,
  status,
  specialistOptions,
  onSearchChange,
  onSpecialistChange,
  onStatusChange,
  onClearFilters,
}: DoctorsTableToolbarProps) {
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 350);

  useEffect(() => {
    const normalizedSearch = debouncedSearch.trim();

    if (normalizedSearch === search) {
      return;
    }

    onSearchChange(normalizedSearch);
  }, [debouncedSearch, onSearchChange, search]);

  const hasActiveFilters = Boolean(search || specialist || status !== 'all');

  const specialistValue = useMemo(() => {
    return specialist || 'all';
  }, [specialist]);

  return (
    <Card className='rounded-xl shadow-sm'>
      <CardContent className='grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,220px)_auto]'>
        <div className='space-y-2'>
          <label htmlFor='doctor-search' className='text-sm font-medium'>
            Search
          </label>
          <Input
            id='doctor-search'
            value={searchInput}
            placeholder='Search by doctor name'
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='doctor-specialist' className='text-sm font-medium'>
            Specialist
          </label>
          <Select value={specialistValue} onValueChange={(value) => onSpecialistChange(value === 'all' ? '' : value)}>
            <SelectTrigger id='doctor-specialist' className='w-full'>
              <SelectValue placeholder='All specialists' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All specialists</SelectItem>
              {specialistOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='doctor-status' className='text-sm font-medium'>
            Approval Status
          </label>
          <Select value={status} onValueChange={(value) => onStatusChange(value as DoctorStatusFilter)}>
            <SelectTrigger id='doctor-status' className='w-full'>
              <SelectValue placeholder='All approval statuses' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All statuses</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='approved'>Approved</SelectItem>
              <SelectItem value='rejected'>Rejected</SelectItem>
            </SelectContent>
          </Select>
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
