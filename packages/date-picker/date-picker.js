import React, { useEffect, useRef, useState } from 'react';

/**
 * [Ams] (WIP) Magic Date Picker Component.
 *
 * @param {string|undefined} id
 * @param {string} label
 * @param {Date|undefined} value
 * @param {function} onChange
 * @param {string|null} hint
 * @param {string|null} error
 * @param {Date|undefined} baseDate
 * @return {JSX.Element}
 */
export const AmsDatePicker = ({
  id = 'ams-date-picker',
  label,
  value,
  onChange,
  hint,
  error,
  baseDate,
}) => {
  // Date picker value state.
  const [valueState, setValueState] = useState(null);

  // Date picker open state.
  const [isOpen, setIsOpen] = useState(false);

  // Date picker hint state.
  const [hintState, setHintState] = useState(null);

  // Date picker input field error state.
  const [errorState, setErrorState] = useState(null);

  // Date picker anchor element.
  const boxRef = useRef(null);

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  // Update hint state when hint prop changes.
  useEffect(() => {
    if (hint) {
      setHintState(hint);
    }
  }, [hint]);

  // Update error state when error prop changes.
  useEffect(() => {
    if (error) {
      setErrorState(error);
    }
  }, [error]);

  // Process the datepicker value into input value.
  useEffect(() => {
    if (valueState) {
      setHintState(null);
      setErrorState(null);
      if (onChange) {
        // Call the onChange callback with Date object.
        // It will always be called nevertheless it is inputted by typing or selecting.
        onChange(valueState);
      }
    }
  }, [valueState]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* TODO */}
    </div>
  );
};
