import React, { createContext, ForwardedRef, useContext, useEffect, useRef, useState } from 'react';
import { isInDaylightSavingConflictTime } from './processor';
import { RootChildrenType } from './index';

type DSCRContextObject = {
  dateState: Date;
  options: {
    firstOption?: number;
    secondOption?: number;
  };
  onOptionClick: (option: 'first' | 'second') => void;
};

const DSCRContext = createContext<DSCRContextObject>({
  dateState: new Date(),
  options: {},
  onOptionClick: () => {},
});

type DSCRRootProps = {
  date: Date;
  onChange: (date: Date) => void;
  children: RootChildrenType;
};

const DSCRRoot = React.forwardRef(({
  date,
  onChange,
  children,
  ...props
}: DSCRRootProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [shouldAppear, setShouldAppear] = useState(false);
  const earlierOption = useRef(0);
  const latterOption = useRef(0);

  useEffect(() => {
    if (date && isInDaylightSavingConflictTime(date)) {
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
      setShouldAppear(true);
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
    <DSCRContext.Provider
      value={{
        dateState: date,
        options: {
          firstOption: earlierOption.current,
          secondOption: latterOption.current,
        },
        onOptionClick: (optionIndex) => {
          getDateBasedOnOptionIndex(optionIndex);
        },
      }}
    >
      <div
        ref={ref}
        style={{
          display: shouldAppear ? 'flex' : 'none',
        }}
        {...props}
      >
        {children}
      </div>
    </DSCRContext.Provider>
  );
});

type DSCROptionProps = {
  option: 'first' | 'second';
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: RootChildrenType;
};

const DSCROption = React.forwardRef(({
  option,
  onClick,
  children,
  ...props
}: DSCROptionProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { dateState, onOptionClick } = useContext(DSCRContext);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        onOptionClick(option);
        if (onClick) {
          onClick(e);
        }
      }}
      {...props}
    >
      {children ?? dateState.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </div>
  );
});

const DSCRFirstOption = (props) => (
  <DSCROption index={'first'} {...props} />
);

const DSCRSecondOption = (props) => (
  <DSCROption index={'second'} {...props} />
);

export const DSCR = {
  Root: DSCRRoot,
  FirstOption: DSCRFirstOption,
  SecondOption: DSCRSecondOption,
};
