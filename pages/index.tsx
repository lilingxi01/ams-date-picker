import React, { useState } from 'react';
import moment from 'moment';
import Head from 'next/head';
import { AmsDesign } from '../packages/support/standards.js';
import { ContentBody } from '../components/body';
import { IconCopy, IconLivePhoto } from '@tabler/icons';
import { getHeadTitle } from '../support/head';
import { Layout, styled } from '../support/stitches.config';
import { DefinedContainer } from '../components/container';

const HeroSubtitle = styled('div', {
  fontSize: '$md',
  fontWeight: 400,
  color: '$mauveA8',
  letterSpacing: '$text',
  lineHeight: 1.5,
  '& b': {
    fontWeight: 400,
    color: '$mauveA11',
  },
});

const InstallCommandBox = styled('div', {
  '& code': {
    fontFamily: '"Fira Code", monospace',
  },
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

const SectionSidebar = styled('div', {
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  rowGap: '18px',
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
  const [date, setDate] = useState(moment());

  return (
    <DefinedContainer
      css={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          // This is coming from https://cmdk.paco.me/.
          backgroundImage: `
          radial-gradient(at 27% 37%,#3a8bfd 0,transparent 50%),radial-gradient(at 97% 21%,#9772fe 0,transparent 50%),radial-gradient(at 52% 99%,#fd3a4e 0,transparent 50%),radial-gradient(at 10% 29%,#5afc7d 0,transparent 50%),radial-gradient(at 97% 96%,#e4c795 0,transparent 50%),radial-gradient(at 33% 50%,#8ca8e8 0,transparent 50%),radial-gradient(at 79% 53%,#eea5ba 0,transparent 50%)
          `,
          filter: 'blur(100px) saturate(160%)',
          opacity: 0.08,
          '.dark &': {
            opacity: 0.12,
          },
        },
      }}
    >
      <Head>
        <title>{getHeadTitle()}</title>
      </Head>
      <Layout
        css={{
          width: '100%',
          paddingTop: 100,
          paddingBottom: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          rowGap: 8,
          '@md': {
            alignItems: 'center',
            textAlign: 'center',
          },
        }}
      >
        <Layout
          css={{
            backgroundColor: '$mauveA1',
            border: '1px solid $fadedBorder',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
            padding: '6px 12px',
            marginBottom: 6,
          }}
        >
          <Layout
            css={{
              fontSize: '$xxs',
              fontWeight: 400,
              color: '$mauve11',
              letterSpacing: '$text',
              '& b': {
                fontWeight: 500,
                color: '$mauve12',
              },
            }}
          >
            This project is still a <b>work in progress</b>.
          </Layout>
        </Layout>
        <Layout
          css={{
            fontFamily: '$typography',
            fontSize: 35,
            fontWeight: 500,
            letterSpacing: '$title',
            lineHeight: 1.20,
            paddingTop: 6,
            paddingBottom: 10,
            '@sm': {
              fontSize: 45,
              lineHeight: 1.12,
            },
            '@md': {
              fontSize: 50,
              lineHeight: 1.06,
            },
          }}
        >
          Date picker has never been <em>modern</em> and <em>magical</em> like this.
        </Layout>
        <HeroSubtitle>
          The most <b>modern</b>, <b>efficient</b>, and <b>intuitive</b> way to select the date and time.
        </HeroSubtitle>
        <HeroSubtitle>
          It is time to <b>re-engineer</b> the date picker for your stack.
        </HeroSubtitle>
      </Layout>
      <div
        style={{
          width: '100%',
          height: '460px',
          flexShrink: 1,
          display: 'none',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#fefefe',
          border: `1px solid ${AmsDesign.color.gray[200]}`,
          borderRadius: 20,
          padding: '20px',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            fontWeight: '500',
            color: AmsDesign.color.accentColor,
            letterSpacing: '-0.01em',
            paddingBottom: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: '6px',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          <IconLivePhoto width={18} height={18}/>
          <span>Try out our live demo</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            flexShrink: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            rowGap: 30,
            paddingTop: 70,
          }}
        >
          {/* <div*/}
          {/*  style={{*/}
          {/*    width: '100%',*/}
          {/*    display: 'flex',*/}
          {/*    flexDirection: 'row',*/}
          {/*    alignItems: 'flex-start',*/}
          {/*    justifyContent: 'center',*/}
          {/*    columnGap: 15,*/}
          {/*  }}*/}
          {/* >*/}
          {/*  <Layout*/}
          {/*    css={{*/}
          {/*      height: 40,*/}
          {/*      flexShrink: 0,*/}
          {/*      fontSize: '$md',*/}
          {/*      fontWeight: '500',*/}
          {/*      lineHeight: '40px',*/}
          {/*      textAlign: 'right',*/}
          {/*      letterSpacing: '-0.01em',*/}
          {/*      display: 'flex',*/}
          {/*      flexDirection: 'row',*/}
          {/*      alignItems: 'center',*/}
          {/*      justifyContent: 'center',*/}
          {/*      columnGap: 1,*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <span>Departure Date</span>*/}
          {/*    <AmsUserManual />*/}
          {/*  </Layout>*/}
          {/*  <div*/}
          {/*    style={{*/}
          {/*      width: 300,*/}
          {/*      display: 'flex',*/}
          {/*      flexDirection: 'column',*/}
          {/*      alignItems: 'center',*/}
          {/*      justifyContent: 'center',*/}
          {/*      rowGap: 10,*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <AmsDatePicker*/}
          {/*      value={date.toDate()}*/}
          {/*      onChange={(newDate) => setDate(moment(newDate))}*/}
          {/*    />*/}
          {/*    {isInDaylightSavingConflictTime(date.toDate()) && (*/}
          {/*      <AmsDateConflictResolver*/}
          {/*        date={date.toDate()}*/}
          {/*        onChange={(newDate) => {*/}
          {/*          setDate(moment(newDate));*/}
          {/*        }}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/* </div>*/}
        </div>
      </div>
      <SectionContainer
        css={{
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SectionTitle
          css={{
            textAlign: 'center',
          }}
        >
          Use it in your project
          <p>
            Power up your project and gracefully satisfy your users today.
          </p>
        </SectionTitle>
        <InstallCommandBox>
          <code>
            npm install ams-date-picker
          </code>
          <InstallCommandCopyButton
            width={20}
            height={20}
            strokeWidth={1.75}
            onClick={() => {
              navigator.clipboard.writeText('npm install ams-date-picker');
            }}
          />
        </InstallCommandBox>
        <InstallCommandBox>
          <code>
            yarn add ams-date-picker
          </code>
          <InstallCommandCopyButton
            width={20}
            height={20}
            strokeWidth={1.75}
            onClick={() => {
              navigator.clipboard.writeText('yarn add ams-date-picker');
            }}
          />
        </InstallCommandBox>
      </SectionContainer>
    </DefinedContainer>
  );
}
