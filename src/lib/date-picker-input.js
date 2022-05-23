import React, { useEffect, useState } from 'react';
import { parseDate } from './support/date-picker-processor.js';

export const AmsDatePickerInput = ({
  className,
  id,
  value,
  baseDate,
  onChange,
  onError,
  onKeyPress,
  onFocus,
  onBlur,
  onShouldOpenSelector,
  onShouldCloseSelector,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
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
      onError(e); // Return error.
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
      && !inputValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}(?::\d{2})? (?:AM|PM)?$/)
    );
  };

  // TODO: Make the input element style-less.
  return (
    <input
      className={`ams-date-picker-input ${className ?? ''}`}
      id={id ?? 'ams-date-picker-input'}
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
