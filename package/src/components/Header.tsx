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

const MENU_PROPS = {
  disablePortal: true,
  anchorOrigin: { vertical: "bottom" as const, horizontal: "left" as const },
  transformOrigin: { vertical: "top" as const, horizontal: "left" as const },
  slotProps: {
    paper: {
      className: "select-menu",
      sx: { maxHeight: 500, overflow: "auto" },
    },
  },
};

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
  position: "start" | "end";
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
    .map((_y, i) => relativeTo.getFullYear() - half + i);
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  position,
}: HeaderProps) => {
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(date, Number(event.target.value)));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, Number(event.target.value)));
  };

  const monthId = `${position}-month`;
  const yearId = `${position}-year`;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className="header"
    >
      <Grid>
        <IconContainer>
          <NavButton
            className="nav-button nav-prev"
            data-testid={`${position}-nav-prev`}
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
          id={monthId}
          name={monthId}
          variant="standard"
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={MENU_PROPS}
          sx={getSelectSx}
          className="select month-select"
          data-testid={monthId}
        >
          {MONTHS.map((month, idx) => (
            <MenuItem
              key={month}
              value={idx}
              data-testid={`${monthId}-${month.toLowerCase()}`}
            >
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid>
        <Select
          id={yearId}
          name={yearId}
          variant="standard"
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={MENU_PROPS}
          sx={getSelectSx}
          className="select year-select"
          data-testid={yearId}
        >
          {generateYears(date, 30).map((year) => (
            <MenuItem
              key={year}
              value={year}
              data-testid={`${yearId}-${year}`}
            >
              {year}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid>
        <IconContainer>
          <NavButton
            className="nav-button nav-next"
            data-testid={`${position}-nav-next`}
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
