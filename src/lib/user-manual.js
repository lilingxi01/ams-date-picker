import React from 'react';
import { styled } from '@stitches/react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconQuestionMark } from '@tabler/icons';
import { AmsDesign } from './utils/standards.js';

const UMTrigger = styled(Dialog.Trigger, {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

const UMOverlay = styled(Dialog.Overlay, {
  // background: 'rgba(0 0 0 / 0.4)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const UMContainer = styled(Dialog.Content, {
  width: '80vw',
  maxWidth: '520px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  background: 'white',
  boxShadow: '0 0 30px rgba(0, 0, 0, 0.18)',
  position: 'relative',
});

const UMCloseButton = styled(Dialog.Close, {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    background: AmsDesign.color.gray[100],
  },
});

const UMContent = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      TODO.
    </div>
  );
};

export const AmsUserManual = ({ style, children }) => {
  return (
    <Dialog.Root>
      <UMTrigger
        css={style}
      >
        {children ?? (
          <IconQuestionMark size={24} />
        )}
      </UMTrigger>
      <Dialog.Portal>
        <UMOverlay>
          <UMContainer>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                borderBottom: `1px solid ${AmsDesign.color.gray[200]}`,
                padding: '20px',
              }}
            >
              <UMCloseButton>
                Close
              </UMCloseButton>
            </div>
            <UMContent />
          </UMContainer>
        </UMOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
