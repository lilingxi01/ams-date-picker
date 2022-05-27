import React from 'react';
import Link from 'next/link';
import { styled } from '../packages/support/stitches.config';
import { AmsDesign } from '../packages/support/standards';
import { AmsWebsiteStandards } from '../support/website-standards';
import Image from 'next/image';
import { Layout } from './layout';

const FooterColumn = styled('div', {
  width: '100%',
  '@lg': {
    width: 'auto',
    flexShrink: 0,
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  fontSize: '14px',
  fontWeight: '400',
  color: AmsDesign.color.gray[500],
  rowGap: '12px',
});

const FooterTitle = styled('div', {
  color: AmsDesign.color.gray[700],
  fontWeight: '600',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const FooterLinkContainer = styled('a', {
  color: AmsDesign.color.gray[400],
  fontWeight: '400',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: AmsDesign.color.accentColor,
  },
});

const FooterLink = ({ href, style, children, ...props }) => (
  <Link href={href} passHref={true}>
    <FooterLinkContainer css={style} {...props}>
      {children}
    </FooterLinkContainer>
  </Link>
);

const FooterNote = styled('div', {
  color: AmsDesign.color.gray[400],
  fontSize: '13px',
  fontWeight: '400',
  '& a:hover': {
    color: AmsDesign.color.accentColor,
  },
});

export const AmsWebsiteFooter = () => {
  return (
    <Layout
      style={{
        width: '100%',
        backgroundColor: '#fdfdfd',
        borderTop: `1px solid ${AmsDesign.color.gray[200]}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0',
      }}
    >
      <Layout
        style={{
          width: '100%',
          maxWidth: AmsWebsiteStandards.dimension.pageWidth,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          '@lg': {
            flexDirection: 'row',
          },
          padding: '0 30px',
          rowGap: '40px',
          columnGap: '50px',
        }}
      >
        <FooterColumn
          css={{
            width: '100%',
            flexShrink: '1 !important',
          }}
        >
          <Image
            src={'/images/logo.svg'}
            alt={'Ams Date Picker Logo'}
            width={'160px'}
            height={'20px'}
            style={{
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
          <FooterNote
            css={{
              paddingTop: '3px',
              lineHeight: '1.6',
            }}
          >
            Designed and created by <a href={'https://lingxi.li/'} rel={'noopener noreferrer'} target={'_blank'}>Lingxi Li</a>.<br/>
            Crafted by Ams HQ and all lovely contributors.<br/>
            © 2022 Ams HQ. All rights reserved.
          </FooterNote>
        </FooterColumn>
        <Layout
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexShrink: 0,
            rowGap: '40px',
            columnGap: '50px',
            '@sm': {
              flexDirection: 'row',
            },
            '@lg': {
              width: 'auto',
            },
          }}
        >
          <FooterColumn>
            <FooterTitle>
              Resources
            </FooterTitle>
            <FooterLink href={'/docs'}>
              Documentation
            </FooterLink>
            <FooterLink href={'/design'}>
              Design Kit
            </FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>
              Links
            </FooterTitle>
            <FooterLink href={'https://github.com/lilingxi01/ams-date-picker'}>
              GitHub
            </FooterLink>
          </FooterColumn>
        </Layout>
      </Layout>
    </Layout>
  );
};
