/* eslint-disable jsx-a11y/no-static-element-interactions */

import * as React from 'react';
import { styled } from '@mui/material/styles';

import DateRangePicker from './DateRangePicker';

import { DateRange, DefinedRange } from '../types';

const Container = styled('div')({
  position: 'relative',
});

const PickerWrapper = styled('div')({
  position: 'relative',
  zIndex: 1,
});

const Backdrop = styled('div')({
  position: 'fixed',
  height: '100vh',
  width: '100vw',
  bottom: 0,
  zIndex: 0,
  right: 0,
  left: 0,
  top: 0,
});

export interface DateRangePickerWrapperProps {
  open: boolean;
  toggle: () => void;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange: (dateRange: DateRange) => void;
  closeOnClickOutside?: boolean;
  wrapperClassName?: string;
}

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps,
) => {
  const {
    closeOnClickOutside,
    wrapperClassName,
    toggle,
    open,
  } = props;

  const handleToggle = () => {
    if (closeOnClickOutside === false) {
      return;
    }

    toggle();
  };

  const handleKeyPress = (event: any) => event?.key === 'Escape' && handleToggle();

  return (
    <Container className="container" data-testid="container">
      {
        open && (
          <Backdrop
            className="backdrop"
            onKeyPress={handleKeyPress}
            onClick={handleToggle}
          />
        )
      }

      <PickerWrapper className={`wrapper ${wrapperClassName || ''}`}>
        <DateRangePicker {...props} />
      </PickerWrapper>
    </Container>
  );
};

export default DateRangePickerWrapper;
