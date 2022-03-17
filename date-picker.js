import React, {useEffect, useRef, useState} from 'react';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';

import BPTextInput from './text-input';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';
import {ClickAwayListener, Popper} from '@mui/material';

import {dateOptions} from '../../../utils/business-process/date-options';

export const BPDatePicker = ({label, onChange}) => {
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
    // TODO
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ClickAwayListener
        onClickAway={handlePopoverClose}
      >
        <div>
          <BPTextInput
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
                  overflowY: 'scroll',
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
                    renderInput={(params) => <></>}
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
