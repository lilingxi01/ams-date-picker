import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, LinkLayout, styled } from '../support/stitches.config';
import { DefinedContainer } from './container';
import Logo from './svg/logo.svg';
import { DefinedTransition } from '../support/transition';
import { MiniColorModeSwitcher } from './color-mode-switcher';
import { IconChevronRight } from '@tabler/icons';
import { AmsIcon } from './icon';

const AmsLogo = styled(Logo, {
  width: 180,
  height: 25,
  '@sm': {
    width: 220,
    height: 31,
  },
  userSelect: 'none',
  pointerEvents: 'none',
  '& path': {
    fill: '$primary !important',
  },
  '& g': {
    stroke: '$primary !important',
  },
  '.dark &': {
    '& path': {
      fill: '$mauve12 !important',
    },
    '& g': {
      stroke: '$mauve12 !important',
    },
  },
});

type NavigationItemObject = {
  label: string;
  href: string;
};

const navigationItems: NavigationItemObject[] = [
  {
    label: 'Docs',
    href: '/docs',
  },
  {
    label: 'Use Cases',
    href: '/use-cases',
  },
  // {
  //   name: 'GitHub',
  //   url: 'https://github.com/lilingxi01/ams-date-picker',
  // },
];

const NavigationContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px 0',
  columnGap: 22,
  '&::before, &::after': {
    content: '""',
    width: 24,
    height: 1,
    borderRadius: 999,
    backgroundColor: '$mauveA6',
  },
});

const NavigationItem = styled('a', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$md',
  fontWeight: 400,
  padding: '5px 0',
  transition: DefinedTransition.cubic(),
  '@sm': {
    '&:hover': {
      color: '$mauveA12',
    },
  },
});

export const AmsNavigationBar = () => {
  const router = useRouter();

  return (
    <DefinedContainer
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 10,
      }}
    >
      <Layout
        css={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          columnGap: 10,
        }}
      >
        {router.pathname === '/' ? (
          <Layout
            css={{
              flexShrink: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              rowGap: 4,
            }}
          >
            <Layout
              css={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                columnGap: 10,
              }}
            >
              <AmsLogo viewBox={'0 0 418 50'} />
              <Layout
                css={{
                  backgroundColor: '$mauveA1',
                  border: '1px solid $fadedBorder',
                  borderRadius: 999,
                  transform: 'translateY(-0.8px)',
                  padding: '3px 8px',
                  fontSize: '$smallest',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  color: '$mauveA11',
                  '@sm': {
                    fontSize: '$xxs',
                    transform: 'translateY(-2.5px)',
                  },
                }}
              >
                v0.0.1
              </Layout>
            </Layout>
            <Layout
              css={{
                fontSize: '$xs',
                fontWeight: 400,
                color: '$mauveA9',
                lineHeight: 1.5,
                '@sm': {
                  fontSize: '$sm',
                },
              }}
            >
              <span>A modern, magical, and headless date picker for React.</span>
            </Layout>
          </Layout>
        ) : (
          <Layout
            css={{
              flexShrink: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              columnGap: 10,
            }}
          >
            <Link href={'/'} passHref={true}>
              <LinkLayout
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: DefinedTransition.cubic(),
                  '& rect, & path': {
                    transition: DefinedTransition.cubic(),
                    stroke: '$mauveA8 !important',
                  },
                  '&:hover': {
                    '& rect, & path': {
                      stroke: '$primary !important',
                    },
                    '.dark &': {
                      '& rect, & path': {
                        stroke: '$mauve12 !important',
                      },
                    },
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                <AmsIcon viewBox={'0 0 398 214'} />
              </LinkLayout>
            </Link>
            <Layout
              css={{
                color: '$mauveA8',
                lineHeight: 0,
              }}
            >
              <IconChevronRight
                width={20}
                height={20}
                strokeWidth={2.2}
              />
            </Layout>
            <Layout
              css={{
                fontSize: '$2xl',
                fontWeight: 600,
                color: '$mauve12',
                lineHeight: 1.2,
                letterSpacing: '$title',
                '.dark &': {
                  color: '$mauve12',
                },
              }}
            >
              Docs
            </Layout>
          </Layout>
        )}
        <MiniColorModeSwitcher />
      </Layout>
      <NavigationContainer
        css={{
          display: 'none',
        }}
      >
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            passHref={true}
          >
            <NavigationItem
              css={{
                color: router.pathname === item.href || (item.href !== '/' && router.pathname.startsWith(item.href))
                  ? '$mauveA12'
                  : '$mauveA9',
              }}
            >
              {item.label}
            </NavigationItem>
          </Link>
        ))}
      </NavigationContainer>
    </DefinedContainer>
  );
};
