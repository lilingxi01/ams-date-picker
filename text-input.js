import React, {useState} from 'react';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';

const BPTextInput = ({label, placeholder}) => {
  const [isFocused, setIsFocused] = useState(false);

  const labelStyle = {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 3,
    color: isFocused ? BPColors.green[600] : BPColors.gray[400],
    transition: 'color 0.15s ease-in-out',
  };

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {label ? (
        <p style={labelStyle}>{label}</p>
      ) : <></>}
      <input
        style={{
          width: '100%',
          height: BPDimens.textInputHeight,
          color: BPColors.gray[900],
          fontSize: 16,
          outline: 'none',
          borderRadius: BPDimens.smallRadius,
          border: isFocused ? BPStandards.borderFocus : BPStandards.border,
          background: isFocused ? BPColors.white : BPColors.gray[30],
          transition: 'all 0.15s ease-in-out',
          padding: '5px 10px',
        }}
      />
    </label>
  );
};

export default BPTextInput;
