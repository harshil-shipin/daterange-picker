import type { DateRangePickerPalette } from './palette';

declare module '@mui/material/styles' {
  interface Palette {
    dateRangePicker: Partial<DateRangePickerPalette>;
  }

  interface PaletteOptions {
    dateRangePicker?: Partial<DateRangePickerPalette>;
  }
}

export {};
