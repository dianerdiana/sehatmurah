import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useDebounce } from '@/utils/hooks/use-debounce';

import { UserRole } from '@/types/enums/user-role.enum';

type UserRoleFilter = 'all' | UserRole;
type UserStatusFilter = 'all' | 'true' | 'false';

type UsersTableToolbarProps = {
  search: string;
  role: UserRoleFilter;
  isActive: UserStatusFilter;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: UserRoleFilter) => void;
  onStatusChange: (value: UserStatusFilter) => void;
  onClearFilters: () => void;
};

export function UsersTableToolbar({
  search,
  role,
  isActive,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onClearFilters,
}: UsersTableToolbarProps) {
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 350);

  useEffect(() => {
    if (debouncedSearch === search) {
      return;
    }

    onSearchChange(debouncedSearch.trim());
  }, [debouncedSearch, onSearchChange, search]);

  const hasActiveFilters = Boolean(search || role !== 'all' || isActive !== 'all');

  return (
    <Card className='rounded-xl shadow-sm'>
      <CardContent className='grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,220px)_minmax(0,220px)_auto]'>
        <div className='space-y-2'>
          <label htmlFor='user-search' className='text-sm font-medium'>
            Search
          </label>
          <Input
            id='user-search'
            value={searchInput}
            placeholder='Search by name or email'
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='user-role' className='text-sm font-medium'>
            Role
          </label>
          <Select value={role} onValueChange={(value) => onRoleChange(value as UserRoleFilter)}>
            <SelectTrigger id='user-role' className='w-full'>
              <SelectValue placeholder='All roles' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All roles</SelectItem>
              <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
              <SelectItem value={UserRole.DOCTOR}>Doctor</SelectItem>
              <SelectItem value={UserRole.PATIENT}>Patient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='user-status' className='text-sm font-medium'>
            Status
          </label>
          <Select value={isActive} onValueChange={(value) => onStatusChange(value as UserStatusFilter)}>
            <SelectTrigger id='user-status' className='w-full'>
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
