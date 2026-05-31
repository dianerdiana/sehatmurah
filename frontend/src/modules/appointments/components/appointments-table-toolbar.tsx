import { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { isSameDay } from 'date-fns';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  handleSelectDateChange: (dateRange: DateRange | undefined) => void;
  onClearFilters: () => void;
};

const toSafeDate = (value: string) => {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const isSameRange = (a: DateRange | undefined, b: DateRange | undefined) => {
  const isFromSame = a?.from && b?.from ? isSameDay(a.from, b.from) : a?.from === b?.from;
  const isToSame = a?.to && b?.to ? isSameDay(a.to, b.to) : a?.to === b?.to;

  return isFromSame && isToSame;
};

export function AppointmentsTableToolbar({
  search,
  status,
  startDate,
  endDate,
  onSearchChange,
  onStatusChange,
  handleSelectDateChange,
  onClearFilters,
}: AppointmentsTableToolbarProps) {
  const [searchInput, setSearchInput] = useState(search);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [draftDateRange, setDraftDateRange] = useState<DateRange | undefined>({
    from: toSafeDate(startDate),
    to: toSafeDate(endDate),
  });
  const debouncedSearch = useDebounce(searchInput, 350);

  const appliedDateRange: DateRange | undefined = {
    from: toSafeDate(startDate),
    to: toSafeDate(endDate),
  };

  const handleDatePopoverOpenChange = (nextOpen: boolean) => {
    setIsDatePopoverOpen(nextOpen);

    if (nextOpen) {
      setDraftDateRange(appliedDateRange);
    }
  };

  const canApplyDateRange = Boolean(
    draftDateRange?.from && draftDateRange?.to && !isSameDay(draftDateRange.from, draftDateRange.to),
  );

  const canClearDateRange = Boolean(draftDateRange?.from || draftDateRange?.to);

  const handleClearDateRange = () => {
    setDraftDateRange(undefined);
  };

  const handleApplyDateRange = () => {
    if (!canApplyDateRange) {
      return;
    }

    if (!isSameRange(appliedDateRange, draftDateRange)) {
      handleSelectDateChange(draftDateRange);
    }

    setIsDatePopoverOpen(false);
  };

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
      <CardContent className='grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,1fr))_max-content]'>
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
          <label htmlFor='appointment-date' className='text-sm font-medium'>
            Choose Date
          </label>
          <Popover open={isDatePopoverOpen} onOpenChange={handleDatePopoverOpenChange}>
            <PopoverTrigger asChild>
              <Button variant='ghost' className='border'>
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-fit'>
              <Calendar
                mode='range'
                selected={draftDateRange}
                numberOfMonths={2}
                min={1}
                onSelect={setDraftDateRange}
              />
              <div className='mt-3 flex items-center justify-between gap-3'>
                <Button
                  type='button'
                  size='sm'
                  variant='secondary'
                  onClick={handleClearDateRange}
                  disabled={!canClearDateRange}
                >
                  Clear
                </Button>
                <Button type='button' size='sm' onClick={handleApplyDateRange} disabled={!canApplyDateRange}>
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
