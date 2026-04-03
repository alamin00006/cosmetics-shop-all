import { addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths, format } from 'date-fns';

export type DateRangePreset = 
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'last3months'
  | 'last6months'
  | 'custom';

export interface DateRange {
  from: Date;
  to: Date;
}

export const dateRangePresets: { label: string; value: DateRangePreset }[] = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'Last 30 Days', value: 'last30days' },
  { label: 'This Week', value: 'thisWeek' },
  { label: 'Last Week', value: 'lastWeek' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Last 3 Months', value: 'last3months' },
  { label: 'Last 6 Months', value: 'last6months' },
  { label: 'Custom Range', value: 'custom' },
];

export function getDateRangeFromPreset(preset: DateRangePreset): DateRange {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  switch (preset) {
    case 'today':
      return { from: startOfToday, to: today };
    case 'yesterday':
      return { from: subDays(startOfToday, 1), to: subDays(today, 1) };
    case 'last7days':
      return { from: subDays(startOfToday, 6), to: today };
    case 'last30days':
      return { from: subDays(startOfToday, 29), to: today };
    case 'thisWeek':
      return { from: startOfWeek(startOfToday, { weekStartsOn: 1 }), to: today };
    case 'lastWeek': {
      const lastWeekStart = startOfWeek(subDays(startOfToday, 7), { weekStartsOn: 1 });
      return { from: lastWeekStart, to: endOfWeek(lastWeekStart, { weekStartsOn: 1 }) };
    }
    case 'thisMonth':
      return { from: startOfMonth(startOfToday), to: today };
    case 'lastMonth': {
      const lastMonth = subMonths(startOfToday, 1);
      return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
    }
    case 'last3months':
      return { from: subMonths(startOfToday, 3), to: today };
    case 'last6months':
      return { from: subMonths(startOfToday, 6), to: today };
    default:
      return { from: subDays(startOfToday, 29), to: today };
  }
}

export function getComparisonRange(range: DateRange): DateRange {
  const daysDiff = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
  return {
    from: subDays(range.from, daysDiff + 1),
    to: subDays(range.from, 1),
  };
}

export function formatDateForApi(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDateRange(range: DateRange): string {
  return `${format(range.from, 'MMM d, yyyy')} - ${format(range.to, 'MMM d, yyyy')}`;
}
