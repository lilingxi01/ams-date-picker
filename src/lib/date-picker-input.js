import React, { useEffect, useState } from 'react';
import { parseDate } from './support/date-picker-processor.js';

export const AmsDatePickerInput = ({
  id,
  value,
  baseDate,
  onChange,
  onFocus,
  onBlur,
  onShouldOpenSelector,
  onShouldCloseSelector,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onInputFinish = (text) => {
    try {
      const parsedDate = parseDate(text, baseDate || new Date());
      if (onChange) {
        onChange(parsedDate,);
      }
    } catch (e) {
      onChange(null, e.message); // Return error message.
    }
  };

  const isValidOnBlur = () => {
    return (
      inputValue.length > 0 &&
      !inputValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}(?::\d{2})? (?:AM|PM)?$/)
    );
  };

  return (
    <input
      className={'ams-date-picker-input'}
      id={id ?? 'ams-date-picker-input'}
    >
      {/* TODO */}
    </input>
  );
};
