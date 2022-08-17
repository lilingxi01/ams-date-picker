import React, { useState } from 'react';
import * as DatePicker from '@ams-js/headless';
import { Layout, styled } from '../support/stitches.config';

const DatePickerContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
});

const DatePickerInput = styled(DatePicker.Input, {
  width: '100%',
  border: '1px solid $mauveA4',
  outline: 'none',
  backgroundColor: '$mauveA2',
  borderRadius: '$base',
  padding: '12px 14px',
  fontSize: '$base',
  '&::placeholder': {
    color: '$mauveA8',
  },
});

export function LiveDemo() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <DatePickerContainer>
      <Layout
        css={{
          width: '90%',
          maxWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          rowGap: 8,
        }}
      >
        <DatePicker.Root
          onDateChange={(date) => {
            setErrorMessage(null);
          }}
          onError={(error) => {
            setErrorMessage(error.message);
          }}
        >
          <DatePickerInput
            placeholder={'Write something...'}
          />
        </DatePicker.Root>
        {errorMessage && (
          <Layout
            css={{
              fontSize: '$xxs',
              color: '$red10',
            }}
          >
            {errorMessage}
          </Layout>
        )}
      </Layout>
    </DatePickerContainer>
  );
}
