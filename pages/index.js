import React, { useState } from 'react';
import moment from 'moment';
import Head from 'next/head';
import { AmsDateConflictResolver } from '../packages/date-picker/date-conflict-resolver.js';
import { AmsUserManual } from '../packages/user-manual/index.js';
import { styled } from '../packages/support/stitches.config';
import { AmsDesign } from '../packages/support/standards.js';
import { ContentBody } from '../components/body';
import { AmsWebsiteStandards } from '../support/website-standards';
import { IconCopy, IconLivePhoto } from '@tabler/icons';
import { getHeadTitle } from '../support/head';
import { Layout } from '../components/layout';
import { AmsDatePicker } from '../packages/date-picker/date-picker';
import { isInDaylightSavingConflictTime } from '../packages/date-picker/processor';

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
        </Layout>
        <div
          style={{
            width: '100%',
            height: '460px',
            flexShrink: 1,
            display: 'flex',
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
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                columnGap: 15,
              }}
            >
              <Layout
                css={{
                  height: 40,
                  flexShrink: 0,
                  fontSize: '$md',
                  fontWeight: '500',
                  lineHeight: '40px',
                  textAlign: 'right',
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 1,
                }}
              >
                <span>Departure Date</span>
                <AmsUserManual />
              </Layout>
              <div
                style={{
                  width: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  rowGap: 10,
                }}
              >
                <AmsDatePicker
                  value={date.toDate()}
                  onChange={(newDate) => setDate(moment(newDate))}
                />
                {isInDaylightSavingConflictTime(date.toDate()) && (
                  <AmsDateConflictResolver
                    date={date.toDate()}
                    onChange={(newDate) => {
                      setDate(moment(newDate));
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <SectionContainer
          css={{
            display: 'flex',
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
            <span>
              npm install ams-date-picker
            </span>
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
            <span>
              yarn add ams-date-picker
            </span>
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
      </ContentBody>
    </div>
  );
}
