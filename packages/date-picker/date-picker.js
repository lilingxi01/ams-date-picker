import React, { useEffect, useState } from 'react';
import { AmsDatePickerInput } from './date-picker-input';
import { Layout } from './layout-support.js';
import { AmsDesign } from '../support/standards.js';

/**
 * [Ams] (WIP) Magic Date Picker Component.
 *
 * @param {string|undefined} className
 * @param {string|undefined} id
 * @param {Date|undefined} value
 * @param {function} onChange
 * @param {Date|undefined} baseDate
 * @param {object} layoutStyle
 * @param {object} style
 * @param {any} props
 * @return {JSX.Element}
 */
export const AmsDatePicker = ({
  className,
  id = 'ams-date-picker',
  value,
  onChange,
  baseDate,
  layoutStyle,
  style,
  ...props
}) => {
  // Date picker value state.
  const [valueState, setValueState] = useState(value);

  // Date picker open state.
  const [isOpen, setIsOpen] = useState(false);

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  // Process the datepicker value into input value.
  useEffect(() => {
    if (valueState) {
      if (onChange) {
        // Call the onChange callback with Date object.
        // It will always be called nevertheless it is inputted by typing or selecting.
        onChange(valueState);
      } else {
        console.warn('ams:', 'onChange callback is not defined.');
        console.log('ams:', 'valueState:', valueState);
      }
    }
  }, [valueState]);

  return (
    <Layout
      id={id}
      css={{
        width: '100%',
        height: '42px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: '$md',
        border: '0.5px solid $mauve5',
        backgroundColor: '$mauve2',
        transition: AmsDesign.transition.cubic,
        '&:hover': {
          backgroundColor: '$white',
          border: '0.5px solid $mauve7',
        },
        '&:focus-within': {
          backgroundColor: '$white',
          boxShadow: '$md',
        },
        overflow: 'hidden',
        ...layoutStyle,
      }}
    >
      {/* TODO: Replenish necessary APIs */}
      <AmsDatePickerInput
        className={className}
        id={`${id}-input`}
        value={valueState}
        baseDate={baseDate}
        onChange={(value) => {
          setValueState(value);
        }}
        style={{
          width: '100%',
          height: '100%',
          padding: '10px 14px',
          fontSize: '$lg',
          fontWeight: '400',
          ...style,
        }}
        {...props}
      />
    </Layout>
  );
};
