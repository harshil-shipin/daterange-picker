/* eslint-disable radix */

import {
  Grid,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { type SelectChangeEvent } from "@mui/material/Select";
import { styled, type Theme } from "@mui/material/styles";
import React from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";
import { getDateRangePickerPalette } from "../theme";

const IconContainer = styled("div")({
  padding: 5,
});

const NavButton = styled(IconButton)(({ theme }) => {
  const colors = getDateRangePickerPalette(theme);

  return {
    padding: 10,
    "&:hover": {
      backgroundColor: colors.hoverBackground,
    },
  };
});

const getSelectSx = (theme: Theme) => {
  const colors = getDateRangePickerPalette(theme);

  return {
    color: colors.headerDateText,
    "&:after": {
      display: "none",
    },
  };
};

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}: HeaderProps) => {
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(date, Number(event.target.value)));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, Number(event.target.value)));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid>
        <IconContainer>
          <NavButton
            disabled={prevDisabled}
            onClick={onClickPrevious}
          >
            <ChevronLeft
              sx={(theme) => {
                const colors = getDateRangePickerPalette(theme);
                return {
                  color: prevDisabled ? colors.iconDisabled : colors.icon,
                };
              }}
            />
          </NavButton>
        </IconContainer>
      </Grid>
      <Grid>
        <Select
          variant="standard"
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={{ disablePortal: true }}
          sx={getSelectSx}
        >
          {MONTHS.map((month, idx) => (
            <MenuItem key={month} value={idx}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid>
        <Select
          variant="standard"
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
          sx={getSelectSx}
        >
          {generateYears(date, 30).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid>
        <IconContainer>
          <NavButton
            disabled={nextDisabled}
            onClick={onClickNext}
          >
            <ChevronRight
              sx={(theme) => {
                const colors = getDateRangePickerPalette(theme);
                return {
                  color: nextDisabled ? colors.iconDisabled : colors.icon,
                };
              }}
            />
          </NavButton>
        </IconContainer>
      </Grid>
    </Grid>
  );
};

export default Header;
