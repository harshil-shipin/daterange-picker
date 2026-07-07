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
    <Paper elevation={5} square className="popover">
      <Grid
        container
        direction="row"
        wrap="nowrap"
        className="popover-content"
      >
        <Grid sx={{ flexShrink: 0 }}>
          <HeaderContainer
            container
            alignItems="center"
            className="date-header"
          >
            <HeaderItem className="date-header-item">
              <HeaderDateText
                variant="subtitle1"
                className="start-date-text"
                data-testid="start-date-display"
              >
                {startDate ? format(startDate, "MMMM dd, yyyy") : "Start Date"}
              </HeaderDateText>
            </HeaderItem>
            <HeaderItem className="date-header-item arrow-icon">
              <ArrowRightAlt
                sx={(theme) => {
                  const colors = getDateRangePickerPalette(theme);
                  return { color: colors.icon };
                }}
              />
            </HeaderItem>
            <HeaderItem className="date-header-item">
              <HeaderDateText
                variant="subtitle1"
                className="end-date-text"
                data-testid="end-date-display"
              >
                {endDate ? format(endDate, "MMMM dd, yyyy") : "End Date"}
              </HeaderDateText>
            </HeaderItem>
          </HeaderContainer>
          <Divider className="divider" />
          <Grid
            container
            direction="row"
            justifyContent="center"
            wrap="nowrap"
            className="calendars"
          >
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              position="start"
            />
            <VerticalDivider className="vertical-divider" />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              position="end"
            />
          </Grid>
        </Grid>
        <VerticalDivider className="vertical-divider" />
        <Grid className="defined-ranges-panel">
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
