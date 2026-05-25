import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useDebounce } from '@/utils/hooks/use-debounce';

type PatientGenderFilter = 'all' | 'MALE' | 'FEMALE';

type PatientsTableToolbarProps = {
  search: string;
  gender: PatientGenderFilter;
  onSearchChange: (value: string) => void;
  onGenderChange: (value: PatientGenderFilter) => void;
  onClearFilters: () => void;
};

export function PatientsTableToolbar({
  search,
  gender,
  onSearchChange,
  onGenderChange,
  onClearFilters,
}: PatientsTableToolbarProps) {
  const [searchInput, setSearchInput] = useState(search);

  const debouncedSearch = useDebounce(searchInput, 350);

  useEffect(() => {
    if (debouncedSearch === search) {
      return;
    }

    onSearchChange(debouncedSearch.trim());
  }, [debouncedSearch, onSearchChange, search]);

  const hasActiveFilters = Boolean(search || gender !== 'all');

  return (
    <Card className='rounded-xl shadow-sm'>
      <CardContent className='grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,220px)_auto]'>
        <div className='space-y-2'>
          <label htmlFor='patient-search' className='text-sm font-medium'>
            Search
          </label>
          <Input
            id='patient-search'
            value={searchInput}
            placeholder='Search by name or phone number'
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='patient-gender' className='text-sm font-medium'>
            Gender
          </label>
          <Select value={gender} onValueChange={(value) => onGenderChange(value as PatientGenderFilter)}>
            <SelectTrigger id='patient-gender' className='w-full'>
              <SelectValue placeholder='All genders' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All genders</SelectItem>
              <SelectItem value='MALE'>Male</SelectItem>
              <SelectItem value='FEMALE'>Female</SelectItem>
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
