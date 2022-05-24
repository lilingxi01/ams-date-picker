import React, { useState } from 'react';
import { IconAlertCircle, IconInfoCircle } from '@tabler/icons';
import { styled } from '@stitches/react';
import { AmsDesign } from '../support/standards.js';

const AmsInput = styled('input', {});

/**
 * [BP] The text input component.
 * @param {string} id - The id of the input. If you want to focus on the input field, use the id with `-field` trailing to input the content.
 * @param {string|React.ReactNode} label - The label of the input.
 * @param {function} boxRef - To get the input box (not input field) reference.
 * @param {string} value - The value of the input.
 * @param {function} onChange - The callback function (with event) when the input value is changed.
 * @param {function} onTextChange - The callback function (with text value only) when the input value is changed.
 * @param {string} placeholder - The placeholder of the input.
 * @param {object} style - The style of the component root.
 * @param {object} boxStyle - The style of the input box.
 * @param {object} inputStyle - The style of the input field.
 * @param {function} onFocus - The callback function when the input field is focused.
 * @param {function} onClick - The callback function when the input field is clicked.
 * @param {function} onBlur - The callback function when the input field is blurred.
 * @param {function} onEnterPress - The callback function when the enter key is pressed.
 * @param {function} onEscPress - The callback function when the esc key is pressed.
 * @param {boolean} disableInput - The flag to disable the input field.
 * @param {string|React.ReactNode} beforeField - The content before the input field.
 * @param {string|React.ReactNode} afterField - The content after the input field.
 * @param {string|null} hint - The hint of the input field.
 * @param {string|null} error - The error message.
 * @param {object} props - The other properties of the component.
 * @return {JSX.Element} - The component.
 */
const BPTextInput = ({
  id = 'bp-text-input',
  label,
  boxRef,
  value,
  onChange,
  onTextChange,
  placeholder,
  style,
  boxStyle,
  inputStyle,
  onFocus,
  onClick,
  onBlur,
  onEnterPress,
  onEscPress,
  disableInput,
  beforeField,
  afterField,
  hint,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const labelStyle = {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 3,
    color: error
      ? BPColors.red[600]
      : isFocused || isHovered ? BPColors.green[600] : BPColors.gray[400],
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
    >
      {label ? (
        <div style={labelStyle}>{label}</div>
      ) : <></>}
      <div
        id={id}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '40px', // TODO: Standardize height.
          color: isFocused ? AmsDesign.color.gray[900] : AmsDesign.color.gray[400],
          borderRadius: '7px', // TODO: Standardize.
          // TODO: Standardize border.
          // border: error
          //   ? `1px solid ${'#dc2626'}`
          //   : isFocused || isHovered ? BPStandards.borderFocus : BPStandards.border,
          background: isFocused ? AmsDesign.color.white : AmsDesign.color.gray[30],
          transition: 'all 0.15s ease-in-out',
          ...boxStyle,
        }}
        ref={boxRef}
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }
        }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        {beforeField || <></>}
        <AmsInput
          id={`${id}-field`}
          placeholder={placeholder}
          type={props.type || 'text'}
          style={{
            width: '100%',
            height: '100%',
            color: AmsDesign.color.gray[900],
            fontWeight: '400',
            fontSize: 16,
            outline: 'none',
            border: 'none',
            background: 'transparent',
            padding: '5px 10px',
            pointerEvents: disableInput ? 'none' : 'auto',
            ...inputStyle,
          }}
          css={{
            input: {
              '&::placeholder': {
                textOverflow: 'ellipsis !important',
                color: AmsDesign.color.gray[500],
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
      <div
        style={{
          display: error || hint ? 'flex' : 'none',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          paddingTop: 4,
          color: error ? '#dc2626' : AmsDesign.color.gray[400],
        }}
      >
        <IconAlertCircle
          width={14}
          height={14}
          style={{
            flexShrink: 0,
            display: error ? 'flex' : 'none',
            marginTop: 0.5,
            marginRight: 5,
          }}
        />
        <IconInfoCircle
          width={14}
          height={14}
          style={{
            flexShrink: 0,
            display: hint && !error ? 'flex' : 'none',
            marginTop: 0.5,
            marginRight: 5,
          }}
        />
        <span
          style={{
            fontSize: 12,
            fontWeight: '500',
          }}
        >
          {error || hint || ''}
        </span>
      </div>
    </div>
  );
};

export default BPTextInput;
