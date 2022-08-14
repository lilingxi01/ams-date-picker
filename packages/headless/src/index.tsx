import React, { createContext, ForwardedRef, useContext, useEffect, useMemo, useState } from 'react';
import { parseDate } from './processor';

export type RootChildrenType = (
  React.ReactElement<any>
  | React.ReactNode
  | React.ReactNode[]
  | string
  | null
  );

type AmsHeadlessContextObject = {
  date: Date | null;
  setDate: (date: Date | null) => void;
  baseDate: Date;
  dateOptions?: { [key: string]: any }; // TODO: standardize it.
  onError: (error: any) => void; // TODO: standardize it.
};

const AmsHeadlessContext = createContext<AmsHeadlessContextObject>({
  date: null,
  setDate: () => {},
  baseDate: new Date(),
  onError: () => {},
});

function useAmsHeadlessContext() {
  return useContext(AmsHeadlessContext);
}

export type AmsHeadlessCommonProps = {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  [key: string]: any;
};

/* -----------------------------------------------------------------------------
 * Root
 * ---------------------------------------------------------------------------*/

export const defaultDateOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  weekday: undefined,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
  timeZone: undefined,
};

export type AmsHeadlessRootProps = AmsHeadlessCommonProps & {
  children?: RootChildrenType;
  date?: Date | null;
  baseDate?: Date;
  onDateChange?: (newDate: Date | null) => void;
  onError?: (error: Error) => void;
  dateOptions?: { [key: string]: any }; // TODO: standardize it.
};

export const Root = ({
  children,
  date,
  baseDate,
  onDateChange,
  onError,
  dateOptions,
}: AmsHeadlessRootProps) => {
  const [dateState, setDateState] = useState<Date | null>(date ?? null);
  const baseDateMemo = useMemo<Date>(() => baseDate ?? new Date(), [baseDate]);
  const dateOptionsMemo = useMemo(() => dateOptions ?? defaultDateOptions, [dateOptions]);
  useEffect(() => {
    if (date !== undefined) {
      setDateState(date);
    }
  }, [date]);
  useEffect(() => {
    if (onDateChange && typeof onDateChange === 'function') {
      onDateChange(dateState);
    }
  }, [dateState]);
  return (
    <AmsHeadlessContext.Provider
      value={{
        date: dateState,
        setDate: setDateState,
        baseDate: baseDateMemo,
        dateOptions: dateOptionsMemo,
        onError: (error: Error) => {
          if (onError && typeof onError === 'function') {
            onError(error);
          } else {
            throw error;
          }
        },
      }}
    >
      {children}
    </AmsHeadlessContext.Provider>
  );
};

/* -----------------------------------------------------------------------------
 * Input
 * ---------------------------------------------------------------------------*/

export type AmsHeadlessInputProps = AmsHeadlessCommonProps & {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (newValue: string) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const Input = React.forwardRef(({
  style,
  onChange,
  onKeyPress,
  onFocus,
  onBlur,
  ...props
}: AmsHeadlessInputProps, forwardRef: ForwardedRef<HTMLInputElement>) => {
  const { date, setDate, baseDate, dateOptions, onError } = useAmsHeadlessContext();

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (date) {
      setInputValue(date.toLocaleString('en-US', dateOptions));
    } else {
      setInputValue('');
    }
  }, [date]);

  // This function is a callback when the input is finished by user (on finalizing or on blurring).
  const onInputFinish = (text) => {
    try {
      const parsedDate = parseDate(text, baseDate);
      setDate(parsedDate);
    } catch (e) {
      onError(e);
    }
  };

  // This function is used to handle the close action of the date selector or the blur action of input.
  const handleEscape = () => {
    // TODO: Blur the input when needed.
  };

  // This function should be called to determine if we should finish the input on blur.
  const isValidOnBlur = () => {
    return (
      inputValue.length > 0
      && inputValue.match(/^\d{1,2}\/\d{1,2}\/\d{4},? \d{1,2}:\d{2}(?::\d{2})? ?(?:AM|PM)?$/)
    );
  };

  // This input element is style-less.
  return (
    <input
      value={inputValue}
      ref={forwardRef}
      onChange={(e) => {
        setInputValue(e.target.value);
        if (onChange) {
          onChange(e);
        }
      }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onInputFinish(inputValue);
        }
        if (e.key === 'Escape') {
          handleEscape();
        }
        if (onKeyPress) {
          onKeyPress(e);
        }
      }}
      onFocus={(e) => {
        // TODO: Determine if we should open the data selector.
        if (onFocus) {
          onFocus(e);
        }
      }}
      onBlur={(e) => {
        // Determine if we should close the data selector.
        if (isValidOnBlur()) {
          onInputFinish(inputValue);
        }
        if (onBlur) {
          onBlur(e);
        }
      }}
      {...props}
    />
  );
});
