import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useDebounce } from '@/utils/hooks/use-debounce';

type SpecialistStatusFilter = 'all' | 'true' | 'false';

type SpecialistsTableToolbarProps = {
  search: string;
  category: string;
  isActive: SpecialistStatusFilter;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (value: SpecialistStatusFilter) => void;
  onClearFilters: () => void;
};

export function SpecialistsTableToolbar({
  search,
  category,
  isActive,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onClearFilters,
}: SpecialistsTableToolbarProps) {
  const [searchInput, setSearchInput] = useState(search);
  const [categoryInput, setCategoryInput] = useState(category);

  const debouncedSearch = useDebounce(searchInput, 350);
  const debouncedCategory = useDebounce(categoryInput, 350);

  useEffect(() => {
    if (debouncedSearch === search) {
      return;
    }

    onSearchChange(debouncedSearch.trim());
  }, [debouncedSearch, onSearchChange, search]);

  useEffect(() => {
    if (debouncedCategory === category) {
      return;
    }

    onCategoryChange(debouncedCategory.trim());
  }, [category, debouncedCategory, onCategoryChange]);

  const hasActiveFilters = Boolean(search || category || isActive !== 'all');

  return (
    <Card className='rounded-xl shadow-sm'>
      <CardContent className='grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,220px)_auto]'>
        <div className='space-y-2'>
          <label htmlFor='specialist-search' className='text-sm font-medium'>
            Search
          </label>
          <Input
            id='specialist-search'
            value={searchInput}
            placeholder='Search by name, slug, or description'
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='specialist-category' className='text-sm font-medium'>
            Specialization
          </label>
          <Input
            id='specialist-category'
            value={categoryInput}
            placeholder='Filter by specialist name or slug'
            onChange={(event) => setCategoryInput(event.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='specialist-status' className='text-sm font-medium'>
            Status
          </label>
          <Select value={isActive} onValueChange={(value) => onStatusChange(value as SpecialistStatusFilter)}>
            <SelectTrigger id='specialist-status' className='w-full'>
              <SelectValue placeholder='All statuses' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All statuses</SelectItem>
              <SelectItem value='true'>Active</SelectItem>
              <SelectItem value='false'>Inactive</SelectItem>
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
