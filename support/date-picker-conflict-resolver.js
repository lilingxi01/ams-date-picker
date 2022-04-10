import React, {useEffect, useRef, useState} from 'react';
import {BPColors, BPDimens} from '../../../../utils/business-process/standards';
import {isInDaylightSavingConflictTime, setTimezoneByOffset} from './date-picker-processor';
import styled from 'styled-components';
import {IconAlertTriangle, IconCheck} from '@tabler/icons';

const BPDatePickerConflictOption = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2px;
  padding: 6px;
  
  user-select: none;
  cursor: pointer;
  
  background-color: ${(props) => props.isActive ? BPColors.green[600] : BPColors.transparent};
  
  &:hover {
    background-color: ${(props) => props.isActive ? BPColors.green[600] : BPColors.gray[150]};
  }
  
  &:active {
    background-color: ${(props) => props.isActive ? BPColors.green[700] : BPColors.gray[300]};
  }
`;

export const BPDatePickerConflictResolver = ({date, onChange}) => {
  const [shouldAppear, setShouldAppear] = useState(false);
  const [displayedTime, setDisplayedTime] = useState('Unknown');

  const earlierOption = useRef(null);
  const laterOption = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (date && isInDaylightSavingConflictTime(date)) {
      setShouldAppear(true);
      setDisplayedTime(date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}));

      // Parse the date to get the earlier and later options.
      const yesterdayNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, 12);
      const todayNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);

      earlierOption.current = yesterdayNoon.getTimezoneOffset();
      laterOption.current = todayNoon.getTimezoneOffset();
    } else {
      setShouldAppear(false);
    }
  }, [date]);

  const optionTitleStyle = (value) => {
    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: '2px',
      fontSize: 12,
      color: date && date.getTimezoneOffset() === value ? BPColors.white : BPColors.brand,
      fontWeight: '500',
    };
  };

  const optionTimeStyle = (value) => {
    return {
      fontSize: 15,
      color: date && date.getTimezoneOffset() === value ? BPColors.white : BPColors.black,
      fontWeight: '500',
    };
  };

  const optionTimezoneStyle = (value) => {
    return {
      fontSize: 12,
      color: date && date.getTimezoneOffset() === value ? BPColors.white : BPColors.black,
      fontWeight: '500',
      opacity: date && date.getTimezoneOffset() === value ? 0.70 : 0.55,
    };
  };


  if (!isMounted) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        display: shouldAppear ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BPDimens.smallRadius,
        backgroundColor: BPColors.gray[50],
        border: `1px solid ${BPColors.gray[150]}`,
        overflow: 'hidden',
        marginTop: '8px',
      }}
    >
      <div
        style={{
          width: '100%',
          fontSize: 12,
          fontWeight: '500',
          padding: '6px 8px',
          color: BPColors.gray[500],
          borderBottom: `1px solid ${BPColors.gray[150]}`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          columnGap: '4px',
        }}
      >
        <IconAlertTriangle
          width={13}
          height={13}
          strokeWidth={2.5}
          style={{
            marginTop: '1px',
          }}
        />
        <span>Potential DLS Conflict</span>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BPDatePickerConflictOption
          isActive={date && date.getTimezoneOffset() === earlierOption.current}
          onClick={() => {
            if (onChange && date.getTimezoneOffset() !== earlierOption.current) {
              onChange(setTimezoneByOffset(date, earlierOption.current));
            }
          }}
        >
          <div style={optionTitleStyle(earlierOption.current)}>
            <IconCheck
              width={13}
              height={13}
              strokeWidth={2.8}
              style={{
                marginTop: '1px',
                display: (
                  date && date.getTimezoneOffset() === earlierOption.current ?
                    'block' :
                    'none'
                ),
              }}
            />
            <span>Before</span>
          </div>
          <div style={optionTimeStyle(earlierOption.current)}>{displayedTime}</div>
          <div style={optionTimezoneStyle(earlierOption.current)}>
            {earlierOption.current ? `UTC${earlierOption.current / -60}` : 'Unknown'}
          </div>
        </BPDatePickerConflictOption>
        <BPDatePickerConflictOption
          isActive={date && date.getTimezoneOffset() === laterOption.current}
          onClick={() => {
            if (onChange && date.getTimezoneOffset() !== laterOption.current) {
              onChange(setTimezoneByOffset(date, laterOption.current));
            }
          }}
        >
          <div style={optionTitleStyle(laterOption.current)}>
            <IconCheck
              width={13}
              height={13}
              strokeWidth={2.8}
              style={{
                marginTop: '1px',
                display: (
                  date && date.getTimezoneOffset() === laterOption.current ?
                    'block' :
                    'none'
                ),
              }}
            />
            <span>After</span>
          </div>
          <div style={optionTimeStyle(laterOption.current)}>{displayedTime}</div>
          <div style={optionTimezoneStyle(laterOption.current)}>
            {laterOption.current ? `UTC${laterOption.current / -60}` : 'Unknown'}
          </div>
        </BPDatePickerConflictOption>
      </div>
    </div>
  );
};
