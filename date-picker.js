import React, {useEffect, useRef, useState} from 'react';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';

import BPTextInput from './text-input';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';
import {ClickAwayListener, Popper} from '@mui/material';

import {dateOptions} from '../../../utils/business-process/date-options';
import {DatePickerHelper} from './support/date-picker-helper';

import {parseDate} from './support/date-picker-processor';
import {BPDatePickerConflictResolver} from './support/date-picker-conflict-resolver';

export const BPDatePicker = ({id = 'bp-datepicker', label, hint, error, onChange, baseDate}) => {
  // Date picker value.
  const [value, setValue] = useState(null);

  // Input field value.
  const [inputValue, setInputValue] = useState('');

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
    if (value) {
      setHintState(null);
      setErrorState(null);
      setInputValue(value.toLocaleString('en-US', dateOptions));
      if (onChange) {
        // Call the onChange callback with Date object.
        // It will always be called nevertheless it is inputted by typing or selecting.
        onChange(value);
      }
    }
  }, [value]);

  const onInputFinish = (text) => {
    try {
      const parsedDate = parseDate(text, baseDate || new Date());
      setValue(parsedDate);
    } catch (e) {
      setErrorState(e.message); // Set error message to the error state.
    }
  };

  const isValidOnBlur = () => {
    return (
      inputValue.length > 0 &&
      !inputValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2} (?:AM|PM)?$/)
    );
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
            id={id}
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
            hint={hintState}
            error={errorState}
            placeholder={'mm/dd/yyyy hh:mm'}
            value={inputValue}
            onTextChange={(newValue) => {
              setHintState(null);
              setErrorState(null);
              setInputValue(newValue);
            }}
            onEnterPress={(e) => {
              handlePopoverClose();
              setHintState(null);
              onInputFinish(e.target.value);
            }}
            onEscPress={() => {
              handlePopoverClose();
            }}
            onBlur={() => {
              if (isValidOnBlur()) {
                setHintState('You are not finalizing it. Hit "Enter" after typing.');
              }
            }}
            onClick={() => setIsOpen(true)}
          />
          <BPDatePickerConflictResolver
            date={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
          <Popper
            id={isOpen ? `${id}-popper` : undefined}
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
