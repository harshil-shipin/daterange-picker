export interface DateRangePickerPalette {
  hoverBackground: string;
  dayAccent: string;
  dayDisabledColor: string;
  dayText: string;
  dayDisabledText: string;
  daySelectedText: string;
  weekDayText: string;
  divider: string;
  headerDateText: string;
  icon: string;
  iconDisabled: string;
  rangeListText: string;
  rangeListTextSelected: string;
}

export const defaultDateRangePickerPalette: DateRangePickerPalette = {
  hoverBackground: 'rgba(0, 0, 0, 0.04)',
  dayAccent: '#1976d2',
  dayDisabledColor: 'rgba(0, 0, 0, 0.26)',
  dayText: 'rgba(0, 0, 0, 0.87)',
  dayDisabledText: 'rgba(0, 0, 0, 0.38)',
  daySelectedText: '#ffffff',
  weekDayText: 'rgba(0, 0, 0, 0.54)',
  divider: 'rgba(0, 0, 0, 0.12)',
  headerDateText: 'rgba(0, 0, 0, 0.87)',
  icon: 'rgba(0, 0, 0, 0.54)',
  iconDisabled: 'rgba(0, 0, 0, 0.26)',
  rangeListText: 'rgba(0, 0, 0, 0.87)',
  rangeListTextSelected: 'rgba(0, 0, 0, 0.87)',
};
