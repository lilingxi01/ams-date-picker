import React, { useEffect, useState } from 'react';
import { styled } from '@stitches/react';
import { parseDate } from './processor.js';
import { dateOptions } from '../support/date.js';

const AmsDatePickerInputContainer = styled('input', {
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
});

export const AmsDatePickerInput = ({
  className,
  id,
  style,
  value,
  baseDate,
  onChange,
  onError,
  onKeyPress,
  onFocus,
  onBlur,
  dateOption = dateOptions,
  onShouldOpenSelector,
  onShouldCloseSelector,
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      setInputValue(value.toLocaleString('en-US', dateOption));
    } else {
      setInputValue('');
    }
  }, [value]);

  // This function is a callback when the input is finished by user (on finalizing or on blurring).
  const onInputFinish = (text) => {
    handleCloseDateSelector();
    try {
      const parsedDate = parseDate(text, baseDate || new Date());
      if (onChange) {
        onChange(parsedDate);
      }
    } catch (e) {
      if (onError) {
        onError(e); // Return error.
      } else {
        console.error('ams:', e); // Log error.
      }
    }
  };

  // This function is used to handle the close action of the date selector.
  const handleCloseDateSelector = () => {
    // TODO.
  };

  // This function should be called to determine if we should finish the input on blur.
  const isValidOnBlur = () => {
    return (
      inputValue.length > 0
      && inputValue.match(/^\d{1,2}\/\d{1,2}\/\d{4},? \d{1,2}:\d{2}(?::\d{2})? ?(?:AM|PM)?$/)
    );
  };

  // TODO: Make the input element style-less.
  return (
    <AmsDatePickerInputContainer
      className={`ams-date-picker-input ${className ?? ''}`}
      id={id ?? 'ams-date-picker-input'}
      css={style}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onInputFinish(inputValue);
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
        // TODO: Determine if we should close the data selector.
        if (isValidOnBlur()) {
          onInputFinish(inputValue);
        }
        if (onBlur) {
          onBlur(e);
        }
      }}
    />
  );
};
