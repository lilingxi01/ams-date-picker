import React, {useEffect, useRef, useState} from 'react';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';

import BPTextInput from './text-input';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';
import {ClickAwayListener, Popper} from '@mui/material';

import {dateOptions} from '../../../utils/business-process/date-options';

export const BPDatePicker = ({label, onChange, baseDate, callBack}) => {
  // Date picker value.
  const [value, setValue] = useState(null);

  // Input field value.
  const [inputValue, setInputValue] = useState('');

  // Date picker open state.
  const [isOpen, setIsOpen] = useState(false);

  // Date picker anchor element.
  const boxRef = useRef(null);

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  const addAction = (base, amount, flag) => {
    switch (flag) {
      case 'h':
        const newhour = parseInt(base.getHours()) + parseInt(amount);
        base.setHours(newhour);
        break;
      case 'd':
        const newdate = parseInt(base.getDate()) + parseInt(amount);
        base.setDate(newdate);
        break;
      case 'm':
        const newmin = parseInt(base.getMinutes()) + parseInt(amount);
        base.setMinutes(newmin);
        break;
      case 'mo':
        const newmonth = parseInt(base.getMonth()) + parseInt(amount);
        base.setMonth(newmonth);
        break;
      case 'y':
        const newyear = parseInt(base.getFullYear()) + parseInt(amount);
        base.setFullYear(newyear);
        break;
    }
  };
  const minusAction = (base, amount, flag) => {
    switch (flag) {
      case 'h':
        const newhour = parseInt(base.getHours()) - parseInt(amount);
        base.setHours(newhour);
        break;
      case 'd':
        const newdate = parseInt(base.getDate()) - parseInt(amount);
        base.setDate(newdate);
        break;
      case 'm':
        const newmin = parseInt(base.getMinutes()) - parseInt(amount);
        base.setMinutes(newmin);
        break;
      case 'mo':
        const newmonth = parseInt(base.getMonth()) - parseInt(amount);
        base.setMonth(newmonth);
        break;
      case 'y':
        const newyear = parseInt(base.getFullYear()) - parseInt(amount);
        base.setFullYear(newyear);
        break;
    }
  };

  // Process the input value into datepicker value.
  useEffect(() => {
    const changeFlag = false;
    console.log(baseDate);
    const updatedDate = new Date(baseDate);

    // console.log(baseDate);
    if (inputValue.includes('-') || inputValue.includes('+')) {
      if (inputValue.length >= 4) {
        const reviseList = inputValue.split(' ');
        reviseList.forEach((action) => {
          // console.log(updatedDate);
          const amount = action.charAt(1);
          const flag = action.substring(2);
          if (action.charAt(0) == '+') {
            addAction(updatedDate, amount, flag);
            changeFlag = true;
          } else {
            minusAction(updatedDate, amount, flag);
            changeFlag = true;
          }
        });
      }
    }
    // console.log(updatedDate);
    if (changeFlag) {
      setValue(updatedDate);
      return;
    }

    const input = inputValue;
    // if (inputValue.includes('-') || inputValue.includes('+')) {

    // }
    const inputValueArr = input.split(/[:\s]/i);

    const parsedValue = inputValueArr[0];
    const hour = '00';
    const minutes = '00';

    if (inputValueArr.length > 1) {
      hour = inputValueArr[1].replace(/\D/g, '');
      parsedValue += ' ' + hour;
    }
    if (inputValueArr.length > 2) {
      minutes = inputValueArr[2].replace(/\D/g, '');
      if (/^\d+$/.test(minutes)) {
        parsedValue += ':' + minutes;
      }
    }
    if (input.toLowerCase().includes('am')) {
      if (! /^\d+$/.test(minutes)) {
        parsedValue += ':' + '00';
      }
      parsedValue += ' AM';
    } else if (input.toLowerCase().includes('pm')) {
      if (! /^\d+$/.test(minutes)) {
        parsedValue += ':' + '00';
      }
      parsedValue += ' PM';
    }

    setValue(parsedValue);
  }, [inputValue]);

  // Process the datepicker value into input value.
  useEffect(() => {
    // TODO
    if (value) {
      setInputValue(value.toLocaleString('en-US', dateOptions));
    }
  }, [value]);

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
      <ClickAwayListener
        onClickAway={handlePopoverClose}
      >
        <div
          style={{
            width: '100%',
          }}
        >
          <BPTextInput
            style={{
              width: '100%',
            }}
            label={label}
            boxRef={(ref) => {
              boxRef.current = ref;
            }}
            placeholder={'mm/dd/yyyy hh:mm'}
            value={inputValue}
            onTextChange={(newValue) => {
              setInputValue(newValue);
            }}
            onEnterPress={() => {
              handlePopoverClose();
            }}
            onEscPress={() => {
              handlePopoverClose();
            }}
            onClick={() => setIsOpen(true)}
          />
          <Popper
            id={isOpen ? 'bp-date-picker' : undefined}
            open={isOpen}
            anchorEl={boxRef.current}
            onClose={handlePopoverClose}
            popperOptions={{
              placement: 'bottom-start',
            }}
            style={{
              zIndex: 100,
            }}
          >
            <div
              style={{
                borderRadius: BPDimens.cornerRadius,
                border: BPStandards.border,
                overflow: 'hidden',
                backgroundColor: 'white',
                boxShadow: '0px 20px 50px 0px rgba(0,0,0,0.10)',
                marginTop: 6,
                transform: 'translateX(-5px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsOpen(false);
                }
              }}
            >
              <div
                style={{
                  overflowY: 'auto',
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDateTimePicker
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={value}
                    onChange={(newValue) => {
                      // console.log(newValue);
                      setValue(newValue);
                      callBack(newValue);
                    }}
                    onAccept={() => {
                      handlePopoverClose();
                    }}
                    renderInput={(params) => <TextField {...params}/>}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
};
