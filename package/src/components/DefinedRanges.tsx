import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { isSameDay } from "date-fns";

import { DefinedRange, DateRange } from "../types";
import { getDateRangePickerPalette } from "../theme";

type DefinedRangesProps = {
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
  onClose?: () => void;
};

const RangeListItem = styled(ListItemButton)(({ theme }) => {
  const colors = getDateRangePickerPalette(theme);

  return {
    "&:hover": {
      backgroundColor: colors.hoverBackground,
    },
  };
});

const isSameRange = (first: DateRange, second: DateRange) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const toTestId = (label: string) => label.toLowerCase().replace(/\s+/g, "-");

const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = ({
  ranges,
  setRange,
  selectedRange,
  onClose,
}: DefinedRangesProps) => {
  const theme = useTheme();
  const colors = getDateRangePickerPalette(theme);

  return (
    <List className="defined-ranges">
      {ranges.map((range, idx) => {
        const selected = isSameRange(range, selectedRange);

        return (
          // eslint-disable-next-line react/no-array-index-key
          <RangeListItem
            key={idx}
            className="range-item"
            data-testid={`range-${toTestId(range.label)}`}
            sx={{
              backgroundColor: selected
                ? colors.hoverBackground
                : "transparent",
            }}
            onClick={() => {
              setRange(range);
              onClose?.();
            }}
          >
            <ListItemText
              className="range-text"
              slotProps={{
                primary: {
                  variant: "body2",
                  sx: {
                    paddingRight: "36px",
                    fontWeight: selected ? "bold" : "normal",
                    color: selected
                      ? colors.rangeListTextSelected
                      : colors.rangeListText,
                  },
                },
              }}
            >
              {range.label}
            </ListItemText>
          </RangeListItem>
        );
      })}
    </List>
  );
};

export default DefinedRanges;
