import React, {useState} from 'react';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';

import {InputBase} from '@mui/material';

const BPTextInput = ({label, boxRef, value, onChange, onTextChange, placeholder, style, boxStyle, inputStyle, onFocus, onClick, onBlur, onEnterPress, onEscPress, disableInput, beforeField, afterField, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const labelStyle = {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 3,
    color: isFocused || isHovered ? BPColors.green[600] : BPColors.gray[400],
    transition: 'color 0.15s ease-in-out',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        ...style,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {label ? (
        <p style={labelStyle}>{label}</p>
      ) : <></>}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: BPDimens.textInputHeight,
          color: isFocused ? BPColors.gray[900] : BPColors.gray[400],
          borderRadius: BPDimens.smallRadius,
          border: isFocused || isHovered ? BPStandards.borderFocus : BPStandards.border,
          background: isFocused ? BPColors.white : BPColors.gray[30],
          transition: 'all 0.15s ease-in-out',
          ...boxStyle,
        }}
        ref={boxRef}
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }
        }}
      >
        {beforeField || <></>}
        <InputBase
          placeholder={placeholder}
          type={props.type || 'text'}
          style={{
            width: '100%',
            height: '100%',
            color: BPColors.gray[900],
            fontWeight: '400',
            fontSize: 16,
            outline: 'none',
            border: 'none',
            background: 'transparent',
            padding: '5px 10px',
            pointerEvents: disableInput ? 'none' : 'auto',
            ...inputStyle,
          }}
          sx={{
            input: {
              '&::placeholder': {
                textOverflow: 'ellipsis !important',
                color: BPColors.gray[500],
                fontWeight: '300',
              },
            },
          }}
          onFocus={(event) => {
            setIsFocused(true);
            if (onFocus) {
              onFocus(event);
            }
          }}
          onBlur={(event) => {
            setIsFocused(false);
            if (onBlur) {
              onBlur(event);
            }
          }}
          onChange={(event) => {
            if (onChange) {
              onChange(event);
            }
            if (onTextChange) {
              onTextChange(event.target.value);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && onEnterPress) {
              onEnterPress(event);
            }
            if (event.key === 'Escape' && onEscPress) {
              onEscPress(event);
            }
          }}
          value={value}
          {...props}
        />
        {afterField || <></>}
      </div>
    </div>
  );
};

export default BPTextInput;
