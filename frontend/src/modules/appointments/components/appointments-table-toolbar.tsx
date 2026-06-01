import { useEffect, useState } from 'react';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useDebounce } from '@/utils/hooks/use-debounce';

import { type AppointmentStatusFilter, appointmentStatusOptions } from '../appointment-status';

type AppointmentsTableToolbarProps = {
  search: string;
  status: AppointmentStatusFilter;
  startDate: string;
  endDate: string;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: AppointmentStatusFilter) => void;
  onStartDateChange: (startDate: string) => void;
  onEndDateChange: (endDate: string) => void;
  onClearFilters: () => void;
};

const toInputDateValue = (value: string) => {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString().slice(0, 10);
};

export function AppointmentsTableToolbar({
  search,
  status,
  startDate,
  endDate,
  onSearchChange,
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
  onClearFilters,
}: AppointmentsTableToolbarProps) {
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 350);

  useEffect(() => {
    if (debouncedSearch === search) {
      return;
    }

    onSearchChange(debouncedSearch.trim());
  }, [debouncedSearch, onSearchChange, search]);

  const hasActiveFilters = Boolean(search || status !== 'all' || startDate || endDate);

  return (
    <Card className='rounded-xl shadow-none border-none'>
      <CardHeader>
        <p className='text-sm font-medium text-muted-foreground'>Appointments</p>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900'>My Appointment List</h1>
      </CardHeader>
      <CardContent className='grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_max-content]'>
        <div className='space-y-2 lg:col-span-1'>
          <label htmlFor='appointment-search' className='text-sm font-medium'>
            Search
          </label>
          <Input
            id='appointment-search'
            value={searchInput}
            placeholder='Search by booking code, doctor, or specialist'
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='appointment-status' className='text-sm font-medium'>
            Status
          </label>
          <Select value={status} onValueChange={(value) => onStatusChange(value as AppointmentStatusFilter)}>
            <SelectTrigger id='appointment-status' className='w-full'>
              <SelectValue placeholder='All statuses' />
            </SelectTrigger>
            <SelectContent>
              {appointmentStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='appointment-start-date' className='text-xs text-muted-foreground'>
            Start Date
          </label>
          <Input
            id='appointment-start-date'
            type='date'
            value={toInputDateValue(startDate)}
            onChange={(event) => onStartDateChange(event.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='appointment-end-date' className='text-xs text-muted-foreground'>
            End Date
          </label>
          <Input
            id='appointment-end-date'
            type='date'
            value={toInputDateValue(endDate)}
            onChange={(event) => onEndDateChange(event.target.value)}
          />
        </div>

        <div className='flex items-end'>
          <Button
            title='Clear Filter'
            variant='outline'
            type='button'
            className='w-full lg:w-auto'
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
          >
            <Trash2 />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
