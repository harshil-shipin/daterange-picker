import React from "react";
import {
  Paper,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { format, differenceInCalendarMonths } from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Month from "./Month";
import DefinedRanges from "./DefinedRanges";
import {
  DateRange,
  DefinedRange,
  Setter,
  NavigationAction,
} from "../types";
import { MARKERS } from "../markers";
import { getDateRangePickerPalette } from "../theme";

const HeaderContainer = styled(Grid)({
  padding: "20px 70px",
});

const HeaderItem = styled(Grid)({
  flex: 1,
  textAlign: "center",
});

const VerticalDivider = styled("div")(({ theme }) => {
  const colors = getDateRangePickerPalette(theme);

  return {
    borderLeft: `1px solid ${colors.divider}`,
    marginBottom: 20,
  };
});

const HeaderDateText = styled(Typography)(({ theme }) => {
  const colors = getDateRangePickerPalette(theme);

  return {
    color: colors.headerDateText,
  };
});

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };
  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <HeaderContainer container alignItems="center">
            <HeaderItem>
              <HeaderDateText variant="subtitle1">
                {startDate ? format(startDate, "MMMM dd, yyyy") : "Start Date"}
              </HeaderDateText>
            </HeaderItem>
            <HeaderItem>
              <ArrowRightAlt
                sx={(theme) => {
                  const colors = getDateRangePickerPalette(theme);
                  return { color: colors.icon };
                }}
              />
            </HeaderItem>
            <HeaderItem>
              <HeaderDateText variant="subtitle1">
                {endDate ? format(endDate, "MMMM dd, yyyy") : "End Date"}
              </HeaderDateText>
            </HeaderItem>
          </HeaderContainer>
          <Divider />
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
            />
            <VerticalDivider />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
            />
          </Grid>
        </Grid>
        <VerticalDivider />
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
