import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, styled } from '../support/stitches.config';
import { DefinedContainer } from './container';
import Logo from './svg/logo.svg';
import { DefinedTransition } from '../support/transition';
import { MiniColorModeSwitcher } from './color-mode-switcher';

const AmsLogo = styled(Logo, {
  width: 180,
  height: 26,
  '@sm': {
    width: 250,
    height: 36,
  },
  userSelect: 'none',
  pointerEvents: 'none',
  '& path': {
    fill: '$mauve12 !important',
  },
  '& g': {
    stroke: '$mauve12 !important',
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

const AmsNavigationItem = styled('a', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$md',
  fontWeight: 500,
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        columnGap: 10,
      }}
    >
      <Layout
        css={{
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          rowGap: 5,
        }}
      >
        <AmsLogo viewBox={'0 0 418 50'} />
        <Layout
          css={{
            fontSize: '$sm',
            fontWeight: 400,
            color: '$mauve10',
            lineHeight: 1.5,
          }}
        >
          A modern, magical, and headless date picker component.
        </Layout>
      </Layout>
      <MiniColorModeSwitcher />
      <Layout
        css={{
          flexShrink: 0,
          display: 'none',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            passHref={true}
          >
            <AmsNavigationItem
              css={{
                color: router.pathname === item.href || (item.href !== '/' && router.pathname.startsWith(item.href))
                  ? '$mauveA12'
                  : '$mauveA8',
              }}
            >
              {item.label}
            </AmsNavigationItem>
          </Link>
        ))}
      </Layout>
    </DefinedContainer>
  );
};
