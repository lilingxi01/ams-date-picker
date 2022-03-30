import React, {useEffect, useRef, useState} from 'react';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';

import BPTextInput from './text-input';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';
import {ClickAwayListener, Popper} from '@mui/material';

import {dateOptions} from '../../../utils/business-process/date-options';
import {DatePickerHelper} from './support/date-picker-helper';

import {parseDate} from './support/date-picker-processor';

export const BPDatePicker = ({label, onChange, baseDate}) => {
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

  // Process the input value into datepicker value.
  useEffect(() => {
    // setValue(parseDate(inputValue, baseDate));
  }, [inputValue]);

  // Process the datepicker value into input value.
  useEffect(() => {
    // TODO
    if (value) {
      setInputValue(value.toLocaleString('en-US', dateOptions));
      if (onChange) {
        onChange(value);
      }
    }
  }, [value]);

  const onInputFinish = (text) => {
    try {
      const parsedDate = parseDate(text, baseDate || new Date());
      setValue(parsedDate);
    } catch (e) {
      console.error(e.toString());
      // TODO: Set error state to the input field.
    }
  };

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
            label={(
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {label}
                <DatePickerHelper/>
              </div>
            )}
            boxRef={(ref) => {
              boxRef.current = ref;
            }}
            placeholder={'mm/dd/yyyy hh:mm'}
            value={inputValue}
            onTextChange={(newValue) => {
              setInputValue(newValue);
            }}
            onEnterPress={(e) => {
              handlePopoverClose();
              onInputFinish(e.target.value);
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
                      setValue(newValue);
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
