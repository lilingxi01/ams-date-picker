import React, { useState } from 'react';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import { styled } from '../packages/support/stitches.config';
import { AmsDesign } from '../packages/support/standards.js';
import { ContentBody } from '../components/body';
import { AmsWebsiteStandards } from '../support/website-standards';
import { IconCopy } from '@tabler/icons';
import { getHeadTitle } from '../support/head';
import { Layout } from '../components/layout';

const HeroTitleTag = styled('div', {
  fontSize: '14px',
  fontWeight: '400',
  color: AmsDesign.color.gray[400],
  letterSpacing: '-0.01em',
  '& b': {
    fontWeight: '600',
    color: AmsDesign.color.gray[700],
  },
});

const HeroSubtitle = styled('div', {
  fontSize: '18px',
  fontWeight: '400',
  color: AmsDesign.color.gray[400],
  letterSpacing: '-0.01em',
  '& b': {
    fontWeight: '500',
    color: AmsDesign.color.gray[700],
  },
});

const InstallCommandBox = styled('div', {
  fontFamily: 'Fira Code, monospace',
  fontSize: '14px',
  fontWeight: '500',
  color: AmsDesign.color.black,
  letterSpacing: '-0.01em',
  backgroundColor: AmsDesign.color.gray[100],
  padding: '10px 20px',
  borderRadius: 999,
  transition: 'color 0.2s ease-in-out, transform 0.1s ease-in-out',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: '12px',
});

const InstallCommandCopyButton = styled(IconCopy, {
  cursor: 'pointer',
  color: AmsDesign.color.gray[400],
  transition: 'color 0.12s ease-in-out',
  '&:hover': {
    color: AmsDesign.color.accentColor,
  },
});

const SectionContainer = styled('div', {
  width: '100%',
  padding: '55px 15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '400',
  rowGap: '15px',
});

const AmsPrimaryButton = styled('a', {
  fontSize: '17px',
  fontWeight: '400',
  color: AmsDesign.color.white,
  backgroundColor: AmsDesign.color.accentColor,
  border: 'none',
  borderRadius: '999px',
  padding: '10px 22px',
  transition: 'opacity 0.2s ease-in-out',
  cursor: 'pointer',
  opacity: 1.0,
  '&:hover': {
    opacity: 0.8,
  },
});

const AmsSecondaryButton = styled('a', {
  fontSize: '17px',
  fontWeight: '400',
  color: AmsDesign.color.accentColor,
  backgroundColor: AmsDesign.color.transparent,
  border: 'none',
  borderRadius: '999px',
  padding: '10px 22px',
  transition: 'background-color 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: AmsDesign.color.gray[50],
    textDecoration: 'underline',
  },
});

const SectionTitle = styled('div', {
  color: AmsDesign.color.black,
  fontSize: '30px',
  fontWeight: '600',
  letterSpacing: '-0.01em',
  '& p': {
    color: AmsDesign.color.gray[400],
    fontSize: '15px',
    fontWeight: '400',
    padding: '8px 0',
    margin: '0',
  },
});

export default function Home() {
  const [date, setDate] = useState(moment('11/07/2021 1:00 AM'));

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
      <Head>
        <title>{getHeadTitle()}</title>
      </Head>
      <ContentBody
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 15px',
        }}
      >
        <Layout
          style={{
            width: '100%',
            paddingTop: AmsWebsiteStandards.dimension.navigationBarHeight + 60,
            paddingBottom: 60,
            paddingLeft: '15px',
            paddingRight: '15px',
            flexShrink: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            rowGap: '10px',
            '@md': {
              alignItems: 'center',
              textAlign: 'center',
            },
          }}
        >
          <div
            style={{
              backgroundColor: AmsDesign.color.gray[70],
              border: `1px solid ${AmsDesign.color.gray[200]}`,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          >
            <HeroTitleTag
              css={{
                padding: '8px 12px',
              }}
            >
              This project is still a <b>work in progress</b>.
            </HeroTitleTag>
          </div>
          <Layout
            style={{
              maxWidth: '800px',
              fontSize: '40px',
              fontWeight: '600',
              letterSpacing: '-0.01em',
              lineHeight: '1.22',
              paddingTop: 6,
              paddingBottom: 10,
              '@sm': {
                fontSize: '46px',
                lineHeight: '1.20',
              },
              '@md': {
                fontSize: '50px',
                lineHeight: '1.10',
              },
            }}
          >
            A <span
              style={{
                background: '-webkit-linear-gradient(#0688FF, #015CAF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
            modern
            </span> and <span
              style={{
                background: '-webkit-linear-gradient(#f97316, #ea580c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
            magical
            </span> React date picker you always wanted.
          </Layout>
          <HeroSubtitle>
            The most <b>modern</b>, <b>efficient</b>, and <b>intuitive</b> way to select the date and time.
          </HeroSubtitle>
          <HeroSubtitle>
            It is time to <b>re-engineer</b> the date picker for your stack.
          </HeroSubtitle>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 28,
              rowGap: 10,
            }}
          >
            <Link
              href={'https://github.com/lilingxi01/ams-date-picker/discussions'}
              passHref={true}
            >
              <AmsPrimaryButton>
                Discuss with us on GitHub
              </AmsPrimaryButton>
            </Link>
            <Link
              href={'https://github.com/lilingxi01/ams-date-picker'}
              passHref={true}
            >
              <AmsSecondaryButton>
                Go to repository
              </AmsSecondaryButton>
            </Link>
          </div>
        </Layout>
      </ContentBody>
    </div>
  );
}
