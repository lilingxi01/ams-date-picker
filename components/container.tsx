import { styled } from '../support/stitches.config';
import { AmsWebsiteStandards } from '../support/website-standards';

export const DefinedFullSizeFrame = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const DefinedFullSizeContainer = styled(DefinedFullSizeFrame, {
  paddingLeft: 24,
  paddingRight: 24,
  '@lg': {
    paddingLeft: 28,
    paddingRight: 28,
  },
});

/*
  You need to specify `maxWidth` your self in order to constrain the width of this container.
 */
export const DefinedContainer = styled(DefinedFullSizeContainer, {
  maxWidth: AmsWebsiteStandards.pageWidth,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
});
