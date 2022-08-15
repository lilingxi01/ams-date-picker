import React from 'react';
import moment from 'moment';
import { Layout, styled } from '../support/stitches.config';
import { DefinedContainer } from '../components/container';
import { DefinedSEO } from '../components/seo';
import { Divider } from '../components/divider';
import { IconBolt, IconCommand, IconCone, IconInfinity } from '@tabler/icons';
import { Simulation } from '../components/simulations/time-machine';

const HeroTitle = styled('h1', {
  margin: 0,
  padding: 0,
  fontFamily: '$typography',
  fontSize: 33,
  fontWeight: 500,
  letterSpacing: '$title',
  lineHeight: 1.20,
  paddingTop: 6,
  paddingBottom: 10,
  '@sm': {
    fontSize: 42,
    lineHeight: 1.12,
  },
  '@md': {
    fontSize: 50,
    lineHeight: 1.06,
  },
});

const HeroSubtitle = styled('div', {
  fontSize: '$sm',
  fontWeight: 400,
  color: '$mauveA9',
  lineHeight: 1.5,
  '& b': {
    fontWeight: 400,
    color: '$mauveA12',
  },
  '@sm': {
    fontSize: '$md',
  },
});

const SectionContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  rowGap: 10,
  padding: '50px 0',
  '@sm': {
    padding: '70px 0',
  },
});

const SectionTip = styled('div', {
  fontSize: '$xs',
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: '$text',
  color: '$primary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: 5,
  '& .icon': {
    width: 18,
    height: 18,
    strokeWidth: 2.2,
    lineHeight: 0,
  },
  '@sm': {
    fontSize: '$sm',
    '& .icon': {
      width: 21,
      height: 21,
      strokeWidth: 2.1,
      marginBottom: -1,
      lineHeight: 0,
    },
  },
});

const SectionTitle = styled('div', {
  fontSize: '$4xl',
  fontWeight: 500,
  fontFamily: '$typography',
  lineHeight: 1.2,
  letterSpacing: '$title',
  color: '$mauve12',
  '@sm': {
    fontSize: '$5xl',
  },
});

const SectionSubtitle = styled('div', {
  fontSize: '$sm',
  fontWeight: 400,
  color: '$mauveA9',
  lineHeight: 1.55,
  '@sm': {
    fontSize: '$base',
  },
  '& strong': {
    fontWeight: 500,
    fontSize: '1em',
  },
});

export default function Home() {
  return (
    <DefinedContainer
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DefinedSEO
        pageTitle={null}
      />
      <Layout
        css={{
          width: '100%',
          paddingTop: 75,
          paddingBottom: 65,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          rowGap: 8,
          '@md': {
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: 120,
            paddingBottom: 116,
          },
          position: 'relative',
          zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            // This is coming from https://cmdk.paco.me/.
            backgroundImage: `
            radial-gradient(at 27% 33%, #34d399 0, transparent 50%),
            radial-gradient(at 54% 96%, #f59e0b 0, transparent 50%),
            radial-gradient(at 10% 25%, #4ade80 0, transparent 50%),
            radial-gradient(at 96% 96%, #facc15 0, transparent 50%),
            radial-gradient(at 30% 55%, #84cc16 0, transparent 50%),
            radial-gradient(at 78% 52%, #ef4444 0, transparent 50%)
          `,
            filter: 'blur(100px) saturate(160%)',
            opacity: 0.11,
            transform: 'translateZ(0)',
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
        <HeroTitle>
          Date picker has never been <em>modern</em> and <em>magical</em> like this.
        </HeroTitle>
        <HeroSubtitle>
          The most <b>modern</b>, <b>efficient</b>, and <b>intuitive</b> way to select the date and time.
        </HeroSubtitle>
        <HeroSubtitle>
          Now, let&apos;s <b>re-imagine</b> the date picker in your stack.
        </HeroSubtitle>
      </Layout>
      <Divider />
      <SectionContainer>
        <SectionTip>
          <IconInfinity />
          <span>Time Machine</span>
        </SectionTip>
        <SectionTitle>Flash into the moment you need, fast.</SectionTitle>
        <SectionSubtitle>
          Ideas in your mind may not be specific dates at all time. They usually are
          a rough idea like "yesterday 9pm" or "10 minutes ago". With Ams Date Picker, you are able to
          directly use these information in a traditional date picker – you don&apos;t have to convert anymore.
        </SectionSubtitle>
        <Simulation
          css={{
            marginTop: 25,
          }}
          text={'Yesterday 9:30 PM'}
          inputs={[
            {
              content: '-1d',
              label: 'Yesterday',
              trailingSpace: true,
            },
            {
              content: '9:30pm',
              label: 'At 9:30 PM',
            },
          ]}
          targetMoment={moment().subtract(1, 'days').set('hour', 21).set('minute', 30)}
        />
      </SectionContainer>
      <Divider />
      <SectionContainer>
        <SectionTip>
          <IconBolt />
          <span>Input Supercharge</span>
        </SectionTip>
        <SectionTitle>Break the rules, move in lightspeed.</SectionTitle>
        <SectionSubtitle>
          We all hate doing useless works, but we barely evolved our date picker, which requires us to input
          all redundant information at all time. With Ams Date Picker, you are able to eliminate unnecessary
          information and focus on the important one.
        </SectionSubtitle>
        <Simulation
          css={{
            marginTop: 25,
          }}
          text={'August 1st at 1 PM'}
          inputs={[
            {
              content: '08/',
              label: 'August',
            },
            {
              content: '01',
              label: '1st',
              trailingSpace: true,
            },
            {
              content: '1pm',
              label: 'At 1:00 PM',
            },
          ]}
          targetMoment={moment().month(7).date(1).set('hour', 13).set('minute', 0)}
        />
      </SectionContainer>
      <Divider />
      <SectionContainer>
        <SectionTip>
          <IconCone />
          <span>Computational Duration</span>
        </SectionTip>
        <SectionTitle>Computing a future? A past.</SectionTitle>
        <SectionSubtitle>
          Do you feel tired when you want to select a duration and you have to compute the end time yourself?
          With Ams Date Picker, you are able to directly input the duration, and we will do the computation
          task for you. Computing the end time will be the past forever.
        </SectionSubtitle>
      </SectionContainer>
      <Divider />
      <SectionContainer>
        <SectionTip>
          <IconCommand />
          <span>Modern Selector</span>
        </SectionTip>
        <SectionTitle>Prefer classic? Make it a modern one!</SectionTitle>
        <SectionSubtitle>
          You don&apos;t really like this game-changing date picker? Not problem! We will never change your
          habit. With Ams Date Picker, you still have the classic GUI date selector and it feels
          even smoother after we fine-tuned it. It becomes a modern one.
        </SectionSubtitle>
      </SectionContainer>
      <Divider />
      <SectionContainer
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Layout
          css={{
            padding: 10,
            fontSize: '$sm',
            fontWeight: 400,
            color: '$mauveA9',
            letterSpacing: '$text',
            lineHeight: 1.55,
            '@sm': {
              fontSize: '$base',
            },
          }}
        >
          The first minor version will be release soon. Stay tuned.
        </Layout>
      </SectionContainer>
    </DefinedContainer>
  );
}
