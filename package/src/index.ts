import './theme';

import DateRangePickerExporter from './components/DateRangePickerExporter';
import DateRangePicker from './components/DateRangePicker';
import { DateRange, DefinedRange } from './types';
import {
  defaultDateRangePickerPalette,
  type DateRangePickerPalette,
} from './theme';
import type { DateRangePickerWrapperProps } from './components/DateRangePickerWrapper';

export {
  DateRangePickerExporter as DateRangePicker,
  DateRangePicker as DateRangePickerComponent,
  DefinedRange,
  DateRange,
  defaultDateRangePickerPalette,
};

export type { DateRangePickerPalette, DateRangePickerWrapperProps };
