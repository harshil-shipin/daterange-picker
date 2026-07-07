import * as React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  getDate,
  isSameMonth,
  isToday,
  format,
  isWithinInterval,
} from "date-fns";
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay,
} from "../utils";
import { getDateRangePickerPalette } from "../theme";
import Header from "./Header";
import Day from "./Day";

import { NavigationAction, DateRange } from "../types";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Root = styled(Paper)({
  width: 290,
});

const WeekDaysContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: 10,
  paddingLeft: 15,
  paddingRight: 15,
});

const DaysContainer = styled(Box)({
  paddingLeft: 15,
  paddingRight: 15,
  marginTop: 15,
  marginBottom: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const WeekDayLabel = styled(Typography)(({ theme }) => {
  const colors = getDateRangePickerPalette(theme);

  return {
    width: 36,
    fontSize: 12,
    display: "inline-block",
    textAlign: "center",
    color: colors.weekDayText,
  };
});

interface MonthProps {
  value: Date;
  marker: symbol;
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

const Month: React.FunctionComponent<MonthProps> = (props: MonthProps) => {
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
  } = props;

  // eslint-disable-next-line react/destructuring-assignment
  const [back, forward] = props.navState;

  return (
    <Root square elevation={0}>
      <Box>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Previous)
          }
          onClickNext={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Next)
          }
        />

        <WeekDaysContainer>
          {WEEK_DAYS.map((day) => (
            <WeekDayLabel key={day} variant="caption">
              {day}
            </WeekDayLabel>
          ))}
        </WeekDaysContainer>

        <DaysContainer>
          {chunks(getDaysInMonth(date), 7).map((week, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={idx} display="flex" justifyContent="center">
              {week.map((day) => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted =
                  inDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={format(day, "MM-dd-yyyy")}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={
                      !isSameMonth(date, day) ||
                      !isWithinInterval(day, { start: minDate, end: maxDate })
                    }
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Box>
          ))}
        </DaysContainer>
      </Box>
    </Root>
  );
};

export default Month;
