/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import * as React from 'react';
import {
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

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
}

const DayContainer = styled('div', {
  shouldForwardProp: (prop) =>
    !['startOfRange', 'endOfRange', 'highlighted', 'disabled'].includes(prop as string),
})<{
  startOfRange?: boolean;
  endOfRange?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
}>(({ theme, startOfRange, endOfRange, highlighted, disabled }) => ({
  display: 'flex',
  ...(startOfRange && { borderRadius: '50% 0 0 50%' }),
  ...(endOfRange && { borderRadius: '0 50% 50% 0' }),
  ...(!disabled && highlighted && { backgroundColor: theme.palette.action.hover }),
}));

const DayButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    !['filled', 'outlined'].includes(prop as string),
})<{
  filled?: boolean;
  outlined?: boolean;
}>(({ theme, filled, outlined }) => ({
  height: 36,
  width: 36,
  padding: 0,
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  ...(outlined && {
    border: `1px solid ${theme.palette.primary.dark}`,
  }),
  ...(filled && {
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

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
}: DayProps) => (
  <DayContainer
    startOfRange={startOfRange}
    endOfRange={endOfRange}
    highlighted={highlighted}
    disabled={disabled}
  >
    <DayButton
      filled={!disabled && filled}
      outlined={!disabled && outlined}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={onHover}
    >
      <Typography
        color={!disabled ? 'textPrimary' : 'textSecondary'}
        variant="body2"
        sx={{
          lineHeight: 1.6,
          ...(!disabled && filled && { color: 'primary.contrastText' }),
        }}
      >
        {value}
      </Typography>
    </DayButton>
  </DayContainer>
);

export default Day;
