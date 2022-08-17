import React from 'react';
import moment from 'moment';
import { Layout, LinkLayout, styled } from '../support/stitches.config';
import { DefinedContainer } from '../components/container';
import { DefinedSEO } from '../components/seo';
import { Divider } from '../components/divider';
import {
  IconAccessible,
  IconBolt, IconBrandGithub, IconCode,
  IconCommand,
  IconCone,
  IconInfinity,
  IconSquareRotated,
} from '@tabler/icons';
import { Simulation, SimulationContainer } from '../components/simulations/simulation';
import { TwoLineSimulation } from '../components/simulations/simulation-two';
import { LiveDemo } from '../components/demo';
import { DefinedTransition } from '../support/transition';
import Link from 'next/link';

const sampleCode = `
import * as DatePicker from '@ams-js/headless';

<DatePicker.Root
  date={...}
  baseDate={...}
  onDateChange={(date: Date) => {...}}
>
  <DatePicker.Input
    placeholder={'...'}
  />
  {/* More composable modules coming soon */}
</DatePicker.Root>
`;

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
      width: 20,
      height: 20,
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
          paddingTop: 72,
          paddingBottom: 70,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          rowGap: 8,
          '@md': {
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: 128,
            paddingBottom: 110,
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
              fontWeight: 500,
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
          Now, let&apos;s <b>re-imagine</b> the date picker in your tech stack.
        </HeroSubtitle>
        <Layout
          css={{
            marginTop: 48,
            fontSize: '$xs',
            letterSpacing: '0.01em',
            fontWeight: 500,
            color: '$mauve12',
            transition: DefinedTransition.cubic(),
            padding: '12px 16px',
            borderRadius: 999,
            backgroundColor: '$mauveA2',
            cursor: 'copy',
            userSelect: 'none',
            '@sm': {
              marginTop: 72,
              '&:hover': {
                backgroundColor: '$mauveA4',
              },
            },
            '&:active': {
              transform: 'scale(0.96)',
            },
          }}
          onClick={() => {
            // copy the content.
            navigator.clipboard.writeText('@ams-js/headless');
          }}
        >
          {'@ams-js/headless'}
        </Layout>
        <Layout
          css={{
            fontSize: '$xxs',
            fontWeight: 400,
            color: '$mauveA9',
            letterSpacing: '$text',
          }}
        >
          Use npm, yarn, pnpm, or the one you like.
        </Layout>
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
          directly use these information – you don&apos;t have to convert them anymore.
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
          all redundant information everytime. With Ams Date Picker, you are able to eliminate unnecessary
          information and focus only on the important one.
        </SectionSubtitle>
        <Simulation
          css={{
            marginTop: 25,
          }}
          text={'August 1st at 1 PM'}
          inputs={[
            {
              content: '8/',
              label: 'August',
            },
            {
              content: '1',
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
        <TwoLineSimulation
          css={{
            marginTop: 25,
          }}
          text={'186 min. duration'}
          inputs={{
            line1: [
              {
                content: '+1d',
                label: 'Tomorrow',
                trailingSpace: true,
              },
              {
                content: '8:46',
                label: 'At 8:46 AM',
              },
            ],
            line2: [
              {
                content: '+186m',
                label: 'Add 186 min. as duration',
              },
            ],
          }}
          targetMoments={{
            line1: moment().add(1, 'days').set('hour', 8).set('minute', 46),
            line2: moment().add(1, 'days').set('hour', 8).set('minute', 46).add(186, 'minutes'),
          }}
        />
      </SectionContainer>
      <Divider />
      <SectionContainer>
        <SectionTip>
          <IconCommand />
          <span>Modern Selector (Coming soon)</span>
        </SectionTip>
        <SectionTitle>Prefer classic? Make it a modern one!</SectionTitle>
        <SectionSubtitle>
          You don&apos;t really like this game-changing date picker? No problem! We will never try to change your
          habit. With Ams Date Picker, you still have the classic GUI date selector and it feels
          even smoother after we fine-tuned it. It now becomes a modern one.
        </SectionSubtitle>
      </SectionContainer>
      <Divider />
      <SectionContainer>
        <SectionTip>
          <IconAccessible />
          <span>Composable & Unstyled</span>
        </SectionTip>
        <SectionTitle>The best one should always be brand-less.</SectionTitle>
        <SectionSubtitle>
          That means – you have the full control over how it looks and how it feels. From now on, you don&apos;t need to worry about
          being styled by another company – your user will love it so much because it will be as same as your other components.
          (But, we will also have a well-designed, styled version coming soon.)
        </SectionSubtitle>
      </SectionContainer>
      <Divider />
      <SectionContainer
        css={{
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <SimulationContainer>
          <SectionTip
            css={{
              position: 'absolute',
              top: 16,
              left: 16,
              color: '$mauveA12',
              fontSize: '$sm',
              fontWeight: 500,
              columnGap: 8,
              '& .icon': {
                width: 16,
                height: 16,
                strokeWidth: 2.0,
                lineHeight: 0,
              },
              '@sm': {
                fontSize: '$sm',
                '& .icon': {
                  width: 18,
                  height: 18,
                  strokeWidth: 1.9,
                  marginBottom: -1,
                  lineHeight: 0,
                },
              },
            }}
          >
            <IconSquareRotated />
            <span>Try it yourself</span>
          </SectionTip>
          <LiveDemo />
        </SimulationContainer>
      </SectionContainer>
      <Divider />
      <SectionContainer
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 8,
          marginTop: 15,
          marginBottom: 25,
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
            width: '100%',
            overflow: 'clip',
            backgroundColor: '$whiteA8',
            boxShadow: '$card',
            borderRadius: '$lg',
            border: '1px solid $mauveA4',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            '.dark &': {
              backgroundColor: '$blackA7',
            },
            '& pre': {
              width: '100%',
              margin: 0,
              padding: '6px 16px 20px 16px',
              color: '$mauveA11',
              fontSize: 11,
              lineHeight: 1.5,
              fontFamily: '$mono',
              overflowX: 'auto',
              '@sm': {
                fontSize: 12,
              },
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              // hide scrollbar.
              MsOverflowStyle: 'none',
              scrollbarWidth: 'none',
            },
          }}
        >
          <SectionTip
            css={{
              color: '$mauveA12',
              userSelect: 'none',
              fontSize: '$sm',
              fontWeight: 500,
              padding: '16px 16px 0 16px',
              columnGap: 8,
              '& .icon': {
                width: 16,
                height: 16,
                strokeWidth: 2.0,
                lineHeight: 0,
              },
              '@sm': {
                fontSize: '$sm',
                '& .icon': {
                  width: 18,
                  height: 18,
                  strokeWidth: 1.9,
                  marginBottom: -1,
                  lineHeight: 0,
                },
              },
            }}
          >
            <IconCode />
            <span>Run it yourself</span>
          </SectionTip>
          <pre>{sampleCode}</pre>
        </Layout>
        <Layout
          css={{
            marginTop: 70,
            fontSize: '$xs',
            letterSpacing: '0.01em',
            fontWeight: 500,
            color: '$mauve12',
            transition: DefinedTransition.cubic(),
            padding: '12px 16px',
            borderRadius: 999,
            backgroundColor: '$mauveA2',
            cursor: 'copy',
            userSelect: 'none',
            '@sm': {
              marginTop: 70,
              '&:hover': {
                backgroundColor: '$mauveA4',
              },
            },
            '&:active': {
              transform: 'scale(0.96)',
            },
          }}
          onClick={() => {
            // copy the content.
            navigator.clipboard.writeText('@ams-js/headless');
          }}
        >
          {'@ams-js/headless'}
        </Layout>
        <Layout
          css={{
            fontSize: '$xxs',
            fontWeight: 400,
            color: '$mauveA9',
            letterSpacing: '$text',
          }}
        >
          Use npm, yarn, pnpm, or the one you like.
        </Layout>
      </SectionContainer>
      <Divider />
      <SectionContainer
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 16,
          marginTop: 50,
          marginBottom: 30,
        }}
      >
        <Layout
          css={{
            fontSize: '$sm',
            fontWeight: 400,
            color: '$mauveA10',
            letterSpacing: '$text',
            '@sm': {
              fontSize: '$base',
            },
          }}
        >
          Want to contribute or report an issue?
        </Layout>
        <Link href={'https://github.com/lilingxi01/ams-date-picker'} passHref={true}>
          <LinkLayout
            rel={'noopener noreferrer'}
            target={'_blank'}
            css={{
              fontSize: '$xs',
              fontWeight: 400,
              color: '$mauveA11',
              transition: DefinedTransition.cubic(),
              padding: '13px 17px',
              borderRadius: 999,
              backgroundColor: '$mauveA2',
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: 7,
              '@sm': {
                '&:hover': {
                  backgroundColor: '$mauveA4',
                  color: '$mauveA12',
                },
              },
              '&:active': {
                transform: 'scale(0.96)',
              },
            }}
          >
            <IconBrandGithub
              width={18}
              height={18}
              strokeWidth={1.6}
              style={{
                marginLeft: -1,
              }}
            />
            <span>{'lilingxi01/ams-date-picker'}</span>
          </LinkLayout>
        </Link>
      </SectionContainer>
    </DefinedContainer>
  );
}
