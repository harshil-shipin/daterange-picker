/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import * as React from "react";
import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getDateRangePickerPalette } from "../theme";

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
  testId?: string;
}

const DayContainer = styled("div", {
  shouldForwardProp: (prop) =>
    !["startOfRange", "endOfRange", "highlighted", "disabled"].includes(
      prop as string,
    ),
})<{
  startOfRange?: boolean;
  endOfRange?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
}>(({ theme, startOfRange, endOfRange, highlighted, disabled }) => {
  const colors = getDateRangePickerPalette(theme);

  return {
    display: "flex",
    ...(startOfRange && { borderRadius: "50% 0 0 50%" }),
    ...(endOfRange && { borderRadius: "0 50% 50% 0" }),
    ...(!disabled && highlighted && {
      backgroundColor: colors.hoverBackground,
    }),
  };
});

const DayButton = styled(IconButton, {
  shouldForwardProp: (prop) => !["filled", "outlined"].includes(prop as string),
})<{
  filled?: boolean;
  outlined?: boolean;
}>(({ theme, filled, outlined }) => {
  const colors = getDateRangePickerPalette(theme);

  return {
    height: 36,
    width: 36,
    padding: 0,
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: colors.hoverBackground,
    },
    ...(outlined && {
      border: `1px solid ${colors.dayAccent}`,
    }),
    ...(filled && {
      backgroundColor: colors.dayAccent,
      "&:hover": {
        backgroundColor: colors.dayAccent,
      },
    }),
    "&:disabled": {
      color: colors.dayDisabledColor,
    },
  };
});

const DayText = styled(Typography, {
  shouldForwardProp: (prop) => !["filled", "disabled"].includes(prop as string),
})<{
  filled?: boolean;
  disabled?: boolean;
}>(({ theme, filled, disabled }) => {
  const colors = getDateRangePickerPalette(theme);

  return {
    lineHeight: 1.6,
    color: (() => {
      if (disabled) return colors.dayDisabledText;
      if (filled) return colors.daySelectedText;
      return colors.dayText;
    })(),
  };
});

const Day: React.FunctionComponent<DayProps> = ({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  filled,
  onClick,
  onHover,
  value,
  testId,
}: DayProps) => (
  <DayContainer
    className="day-container"
    startOfRange={startOfRange}
    endOfRange={endOfRange}
    highlighted={highlighted}
    disabled={disabled}
  >
    <DayButton
      className="day-button"
      data-testid={testId}
      filled={!disabled && filled}
      outlined={!disabled && outlined}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={onHover}
    >
      <DayText
        className="day-text"
        variant="body2"
        filled={!disabled && filled}
        disabled={disabled}
      >
        {value}
      </DayText>
    </DayButton>
  </DayContainer>
);

export default Day;
