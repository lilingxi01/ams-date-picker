import React, { useEffect, useState } from 'react';

export const AmsDatePickerInput = ({
  id,
  value,
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

  return (
    <input
      className={'ams-date-picker-input'}
      id={id ?? 'ams-date-picker-input'}
    >
      {/* TODO */}
    </input>
  );
};
