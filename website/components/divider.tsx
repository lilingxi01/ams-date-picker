import { styled } from '../support/stitches.config';

export const Divider = styled('div', {
  width: '70%',
  maxWidth: 360,
  height: 1,
  borderRadius: 999,
  backgroundColor: '$border',
  maskImage: 'linear-gradient(90deg, transparent, #fff 80px, #fff calc(100% - 80px), transparent)',
});
