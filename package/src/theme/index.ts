import type { Theme } from '@mui/material/styles';

import './augmentation';
import { defaultDateRangePickerPalette, type DateRangePickerPalette } from './palette';

export type { DateRangePickerPalette } from './palette';
export { defaultDateRangePickerPalette } from './palette';

export const getDateRangePickerPalette = (theme: Theme): DateRangePickerPalette => ({
  ...defaultDateRangePickerPalette,
  ...theme.palette.dateRangePicker,
});
