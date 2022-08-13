import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconHelp } from '@tabler/icons';

import ReactMarkdown from 'react-markdown';
import userManualContent from './content.md';
import { styled } from '../support/stitches.config.js';

const UMTrigger = styled(Dialog.Trigger, {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

const UMOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  zIndex: 99999,
});

const UMContainer = styled(Dialog.Content, {
  width: '85vw',
  maxWidth: 520,
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
    backgroundColor: '$mauve2',
  },
});

const UMContent = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
      }}
    >
      <ReactMarkdown>
        {/* @ts-ignore */}
        {userManualContent}
      </ReactMarkdown>
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
          <IconHelp size={17} strokeWidth={2.1} style={{
            marginBottom: -2,
          }}/>
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
                borderBottom: '1px solid $layoutBorder',
                padding: 20,
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
