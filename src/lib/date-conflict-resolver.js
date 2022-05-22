import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@stitches/react';
import { isInDaylightSavingConflictTime } from './support/date-picker-processor.js';

export const AmsDateConflictResolver = () => {
  return (
    <div>
      {/* TODO: Implement this component. */}
    </div>
  );
};

/* -----------------------------------------------------------------------------
 * Ams DSCR Module
 * ---------------------------------------------------------------------------*/

const DSCRContext = React.createContext('ams-dscr');

const DSCRRootContainer = styled(DSCRContext.Provider, {
  display: 'flex',
  flexDirection: 'row',
});

const DSCROptionContainer = styled('div', {});

const DSCRRoot = ({ date, onChange, style, children, ...props }) => {
  const [shouldAppear, setShouldAppear] = useState(false);
  const earlierOption = useRef(null);
  const latterOption = useRef(null);

  useEffect(() => {
    if (date && isInDaylightSavingConflictTime(date)) {
      setShouldAppear(true);
      // Parse the date to get the earlier options.
      earlierOption.current = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1,
        12,
      ).getTimezoneOffset();
      // Parse the date to get the latter options.
      latterOption.current = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12,
      ).getTimezoneOffset();
    } else {
      setShouldAppear(false);
    }
  }, [date]);

  const getDateBasedOnOptionIndex = (optionIndex) => {
    const newDate = date ? new Date(date) : new Date();
    const timezoneOffset = optionIndex === 0
      ? earlierOption.current
      : latterOption.current;
    newDate.setTime(
      newDate.getTime()
      + (timezoneOffset - newDate.getTimezoneOffset()) * 60 * 1000
    );
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <DSCRRootContainer
      css={{
        display: shouldAppear ? 'flex' : 'none',
        ...style,
      }}
      value={{
        dateState: date,
        onOptionClick: (optionIndex) => {
          getDateBasedOnOptionIndex(optionIndex);
        },
      }}
      {...props}
    >
      {children}
    </DSCRRootContainer>
  );
};

const DSCROption = ({ index, onClick, children, style, ...props }) => {
  const { dateState, onOptionClick } = useContext(DSCRContext);

  return (
    <DSCROptionContainer
      css={style}
      onClick={() => {
        onOptionClick(index);
        if (onClick) {
          onClick();
        }
      }}
      {...props.filter((key) => !['index', 'css', 'style'].includes(key))}
    >
      {children ?? dateState.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </DSCROptionContainer>
  );
};

const DSCREarlierOption = (props) => (
  <DSCROption index={0} {...props} />
);

const DSCRLatterOption = (props) => (
  <DSCROption index={1} {...props} />
);

export const AmsDSCRModule = {
  Root: DSCRRoot,
  EarlierOption: DSCREarlierOption,
  LatterOption: DSCRLatterOption,
};
