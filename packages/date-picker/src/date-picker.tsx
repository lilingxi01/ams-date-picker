import { Layout, RichStyle } from '../../support/stitches.config';
import React from 'react';
import { AmsTransition, deepMerge } from './support/styled';
import * as DatePicker from '@ams-js/headless';

type AmsDatePickerProps = {
  className?: string;
  id?: string;
  date?: Date | null;
  baseDate?: Date;
  onDateChange?: (newDate: Date | null) => void;
  style?: RichStyle;
  inputStyle?: RichStyle;
};

export const AmsDatePicker = ({
  className,
  id = 'ams-date-picker',
  date,
  onDateChange,
  baseDate,
  style,
  inputStyle,
  ...props
}: AmsDatePickerProps) => {
  return (
    <Layout
      id={id}
      css={deepMerge({
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
        transition: AmsTransition.cubic(),
        '&:hover': {
          backgroundColor: '$white',
          border: '0.5px solid $mauve7',
        },
        '&:focus-within': {
          backgroundColor: '$white',
          boxShadow: '$md',
        },
        overflow: 'hidden',
      }, style)}
    >
      <DatePicker.Root
        date={date}
        baseDate={baseDate}
        onDateChange={onDateChange}
      >
        <DatePicker.Input
          className={className}
          id={`${id}-input`}
          style={deepMerge({
            width: '100%',
            height: '100%',
            padding: '10px 14px',
            fontSize: '$lg',
            fontWeight: 400,
          }, inputStyle)}
          {...props}
        />
      </DatePicker.Root>
    </Layout>
  );
};
