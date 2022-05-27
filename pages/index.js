import React, { useState } from 'react';
import moment from 'moment';
import { AmsDateConflictResolver } from '../packages/date-picker/date-conflict-resolver.js';
import { AmsUserManual } from '../packages/user-manual/index.js';
import { Layout, styled } from '../packages/support/stitches.config';
import { AmsDesign } from '../packages/support/standards.js';
import { ContentBody } from '../components/body';
import { AmsWebsiteStandards } from '../support/website-standards';

const HeroTitleTag = styled('div', {
  fontSize: '14px',
  fontWeight: '400',
  color: AmsDesign.color.gray[400],
  letterSpacing: '-0.01em',
  '& b': {
    color: AmsDesign.color.gray[700],
  },
});

const HeroSubtitle = styled('div', {
  fontSize: '18px',
  fontWeight: '400',
  color: AmsDesign.color.gray[400],
  letterSpacing: '-0.01em',
  '& b': {
    color: AmsDesign.color.gray[700],
  },
});

const NpmCommandBox = styled('div', {
  fontFamily: 'Fira Code, monospace',
  fontSize: '16px',
  fontWeight: '500',
  color: AmsDesign.color.gray[700],
  letterSpacing: '-0.01em',
  backgroundColor: AmsDesign.color.gray[100],
  padding: '10px 18px',
  borderRadius: 999,
  cursor: 'pointer',
  '&:hover': {
    color: AmsDesign.color.accentColor,
  },
});

export default function Home() {
  const [date, setDate] = useState(moment('11/07/2021 1:00 AM'));

  return (
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
            padding: '5px 0px 10px 0px',
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
          A <b>modern</b>, <b>efficient</b>, and <b>intuitive</b> way to select the date and time.
        </HeroSubtitle>
        <HeroSubtitle>
          Users will thank you <b>so much</b> by using this in your application.
        </HeroSubtitle>
      </Layout>
      <div
        style={{
          width: '100%',
          minHeight: '600px',
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: AmsDesign.color.white,
          // boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.06)',
          border: `1px solid ${AmsDesign.color.gray[200]}`,
          borderRadius: 20,
          padding: '20px',
        }}
      >
        <div
          style={{
            fontSize: '25px',
            fontWeight: '500',
            color: AmsDesign.color.black,
            paddingBottom: '10px',
          }}
        >
          Development Demo
        </div>
        <AmsDateConflictResolver
          date={date.toDate()}
          onChange={(newDate) => {
            setDate(moment(newDate));
          }}
        />
        <AmsUserManual />
      </div>
      <div
        style={{
          width: '100%',
          padding: '40px 15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: AmsDesign.color.gray[500],
          fontSize: '14px',
          fontWeight: '400',
          rowGap: '10px',
        }}
      >
        <span>Try it now</span>
        <NpmCommandBox>
          npm install ams-date-picker
        </NpmCommandBox>
      </div>
    </ContentBody>
  );
}
