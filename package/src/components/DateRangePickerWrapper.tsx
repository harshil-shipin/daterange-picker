import * as React from "react";
import { Popover } from "@mui/material";

import DateRangePicker from "./DateRangePicker";

import { DateRange, DefinedRange } from "../types";

export interface DateRangePickerWrapperProps {
  value: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange: (dateRange: DateRange) => void;
  labelElement: (props: {
    open: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
  }) => React.ReactNode;
  wrapperClassName?: string;
}

const DateRangePickerWrapper: React.FunctionComponent<
  DateRangePickerWrapperProps
> = (props: DateRangePickerWrapperProps) => {
  const { labelElement, ...pickerProps } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {labelElement({ open, onClick: handleClick })}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: {
            className: "daterange-picker-popover",
            style: {
              borderRadius: 10,
              backgroundColor: "#FFF",
              border: `1px solid #E5E7EB`,
              boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
              marginTop: 4,
            },
          },
        }}
      >
        <DateRangePicker {...pickerProps} onClose={handleClose} />
      </Popover>
    </>
  );
};

export default DateRangePickerWrapper;
