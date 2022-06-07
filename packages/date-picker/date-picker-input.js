import React, { useEffect, useState } from 'react';
import { styled } from '@stitches/react';
import { parseDate } from './processor.js';
import { dateOptions } from '../support/date.js';

const AmsDatePickerInputContainer = styled('input', {
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
});

/**
 * [Ams] The headless date picker component.
 * @param {string} className
 * @param {string} id
 * @param {object} style
 * @param {any} value
 * @param {any} baseDate
 * @param {function} onChange - Callback function to be called when the date is changed (only when finalized).
 * @param {function} onError - Callback function when the error is occurring in user's input (neither functionality error nor development error).
 * @param {function} onKeyPress
 * @param {function} onFocus
 * @param {function} onBlur
 * @param {object} dateOption - (TBD) The date option for formatting the date.
 * @param {function} onShouldOpenSelector
 * @param {function} onShouldCloseSelector
 * @param {any} props
 * @return {JSX.Element}
 */
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
  ...props
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
    if (onShouldCloseSelector) {
      onShouldCloseSelector();
    }
    try {
      const parsedDate = parseDate(text, baseDate || new Date());
      if (onChange) {
        onChange(parsedDate);
      }
    } catch (e) {
      if (onError) {
        onError(e); // Return error.
      } else {
        console.error('AmsDatePicker:', e); // Log error.
      }
    }
  };

  // This function is used to handle the close action of the date selector or the blur action of input.
  const handleEscape = () => {
    // TODO: Blur the input when needed.
    // TODO: Call back the onShouldCloseSelector callback with some conditions.
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
      {
        ...props
        // TODO: Handle potential conflicts with props.
      }
    />
  );
};
