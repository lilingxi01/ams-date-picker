import React from 'react';
import { styled } from '@stitches/react';
import * as Dialog from '@radix-ui/react-dialog';
import { IconHelp, IconQuestionMark } from '@tabler/icons';

import { AmsDesign } from '../support/standards.js';

import ReactMarkdown from 'react-markdown';
import userManualContent from './content.md';

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
  zIndex: 9999,
});

const UMContainer = styled(Dialog.Content, {
  width: '85vw',
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
      <ReactMarkdown>
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
