import { styled, keyframes } from '@stitches/react';
import * as Popover from '@radix-ui/react-popover';
import React from 'react';

const slideDown = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(10px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const AmsDatePickerPopperLayout = styled(Popover.Content, {
  animationDuration: '0.6s',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  animationFillMode: 'forwards',
  '&[data-side="top"]': { animationName: slideUp },
  '&[data-side="bottom"]': { animationName: slideDown },
});

// TODO: need to rebuild.
export const AmsDatePickerPopover = ({
  trigger,
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        {trigger}
      </Popover.Trigger>
      <AmsDatePickerPopperLayout>
        {/* TODO */}
      </AmsDatePickerPopperLayout>
    </Popover.Root>
  );
};
