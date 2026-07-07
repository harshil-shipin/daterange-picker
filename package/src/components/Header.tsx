/* eslint-disable radix */

import { Grid, IconButton, Select, MenuItem } from "@mui/material";
import { SelectProps, type SelectChangeEvent } from "@mui/material/Select";
import { styled, type Theme } from "@mui/material/styles";
import React from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";
import { getDateRangePickerPalette } from "../theme";

const MENU_PROPS: SelectProps["MenuProps"] = {
  disableAutoFocusItem: true,
  anchorOrigin: { vertical: "bottom", horizontal: "center" },
  transformOrigin: { vertical: "top", horizontal: "center" },
  slotProps: {
    paper: {
      className: "select-menu custom-scrollbar",
      sx: { maxHeight: 400, overflow: "auto" },
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
    fontSize: "14px",
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

const YEARS = Array.from(
  { length: new Date().getFullYear() - 2021 + 1 },
  (_, i) => 2021 + i,
);

const START_YEAR = YEARS[0];
const now = new Date();
const CURRENT_YEAR = now.getFullYear();
const CURRENT_MONTH = now.getMonth();

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  position,
}: HeaderProps) => {
  const year = getYear(date);
  const month = getMonth(date);
  const atMinBound = year === START_YEAR && month === 0;
  const atMaxBound = year === CURRENT_YEAR && month >= CURRENT_MONTH;
  const isPrevDisabled = prevDisabled || atMinBound;
  const isNextDisabled = nextDisabled || atMaxBound;
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
            disabled={isPrevDisabled}
            onClick={onClickPrevious}
          >
            <ChevronLeft
              sx={(theme) => {
                const colors = getDateRangePickerPalette(theme);
                return {
                  color: isPrevDisabled ? colors.iconDisabled : colors.icon,
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
          className="month-select"
          slotProps={{
            input: {
              // @ts-ignore
              "data-testid": `${monthId}-select`,
            },
          }}
        >
          {MONTHS.map((currentMonth, idx) => (
            <MenuItem
              key={currentMonth}
              value={idx}
              sx={{ fontSize: "14px" }}
              data-testid={`${monthId}-${currentMonth.toLowerCase()}`}
            >
              {currentMonth}
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
          slotProps={{
            input: {
              // @ts-ignore
              "data-testid": `${yearId}-select`,
            },
          }}
        >
          {YEARS.map((currentYear) => (
            <MenuItem
              key={currentYear}
              value={currentYear}
              sx={{ fontSize: "14px" }}
              data-testid={`${yearId}-${currentYear}`}
            >
              {currentYear}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid>
        <IconContainer>
          <NavButton
            className="nav-button nav-next"
            data-testid={`${position}-nav-next`}
            disabled={isNextDisabled}
            onClick={onClickNext}
          >
            <ChevronRight
              sx={(theme) => {
                const colors = getDateRangePickerPalette(theme);
                return {
                  color: isNextDisabled ? colors.iconDisabled : colors.icon,
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
