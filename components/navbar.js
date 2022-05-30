import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AmsWebsiteStandards } from '../support/website-standards.js';
import { styled } from '@stitches/react';
import { AmsDesign } from '../packages/support/standards.js';
import { useRouter } from 'next/router';
import { IconArrowUpRight, IconMenu, IconX } from '@tabler/icons';
import { Layout } from './layout';

const navigationItems = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Docs',
    url: '/docs',
  },
  {
    name: 'Use Cases',
    url: '/use-cases',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/lilingxi01/ams-date-picker',
    external: true,
  },
];

const AmsNavigationItem = styled('a', {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: '500',
  textDecoration: 'none',
  '&:hover': {
    color: AmsDesign.color.accentColor,
    borderBottom: `2px solid ${AmsDesign.color.accentColor}`,
    marginBottom: '-2px',
  },
});

// TODO: Modularize this as a reusable component.
const AmsMobileCloseButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  '@md': {
    display: 'none',
  },
  color: AmsDesign.color.gray[500],
  padding: '10px 16px',
  cursor: 'pointer',
  borderRadius: '999px',
  '&:hover': {
    backgroundColor: AmsDesign.color.gray[100],
  },
  '&:active': {
    color: AmsDesign.color.accentColor,
  },
});

export const AmsNavigationBar = () => {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileNavigationButton = (
    <Layout
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@md': {
          display: 'none',
        },
        color: AmsDesign.color.gray[500],
        padding: '10px',
        margin: '0 18px',
        cursor: 'pointer',
        borderRadius: '999px',
        '&:hover': {
          backgroundColor: AmsDesign.color.gray[100],
        },
        '&:active': {
          color: AmsDesign.color.accentColor,
        },
      }}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      {isMobileMenuOpen ? (
        <IconX width={26} height={26} strokeWidth={1.6} />
      ) : (
        <IconMenu width={26} height={26} strokeWidth={1.6} />
      )}
    </Layout>
  );

  const mobileNavigationMenu = (
    <Layout
      style={{
        width: '100%',
        position: 'fixed',
        display: isMobileMenuOpen ? 'flex' : 'none',
        '@md': {
          display: 'none !important',
        },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: AmsWebsiteStandards.dimension.navigationBarHeight,
        left: 0,
        right: 0,
        borderBottom: `1px solid ${AmsDesign.color.gray[200]}`,
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.06)',
        backgroundColor: AmsDesign.color.gray[70],
        zIndex: 999,
        padding: '16px 30px 4px 30px',
      }}
    >
      <div
        style={{
          width: '100%',
          fontSize: '14px',
          fontWeight: '600',
          textTransform: 'uppercase',
          color: AmsDesign.color.gray[400],
        }}
      >
        Menu
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          rowGap: '24px',
          padding: '24px 0',
        }}
      >
        {
          navigationItems.map((item) => (
            <Link
              href={item.url}
              key={item.name}
              passHref={true}
            >
              <a
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  fontSize: '17px',
                  fontWeight: '500',
                  color: router.pathname === item.url || (item.url !== '/' && router.pathname.startsWith(item.url))
                    ? AmsDesign.color.accentColor
                    : AmsDesign.color.gray[700],
                }}
                onClick={() => setIsMobileMenuOpen(false)}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                <span>{item.name}</span>
                {item.external && (
                  <IconArrowUpRight width={16} height={16} strokeWidth={1.6} />
                )}
              </a>
            </Link>
          ))
        }
      </div>
    </Layout>
  );

  const desktopNavigationMenu = (
    <Layout
      style={{
        width: '100%',
        height: '100%',
        flexShrink: 1,
        display: 'none',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '34px',
        columnGap: '26px',
        '@md': {
          display: 'flex',
        },
      }}
    >
      {
        navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            passHref
          >
            <AmsNavigationItem
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              css={{
                color: router.pathname === item.url || (item.url !== '/' && router.pathname.startsWith(item.url))
                  ? AmsDesign.color.accentColor
                  : AmsDesign.color.gray[400],
              }}
            >
              <span>{item.name}</span>
              {item.url.startsWith('http') && (
                <IconArrowUpRight width={22} height={22} style={{ marginLeft: 1, opacity: 0.6 }} strokeWidth={1.8}/>
              )}
            </AmsNavigationItem>
          </Link>
        ))
      }
    </Layout>
  );

  return (
    <div
      style={{
        width: '100%',
        height: AmsWebsiteStandards.dimension.navigationBarHeight,
        marginBottom: `-${AmsWebsiteStandards.dimension.navigationBarHeight}px`,
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.06)',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fdfdfdcf',
        borderBottom: `1px solid ${AmsDesign.color.gray[200]}`,
        backdropFilter: 'saturate(150%) blur(25px)',
        WebkitBackdropFilter: 'saturate(150%) blur(25px)',
        zIndex: 1999,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          maxWidth: AmsWebsiteStandards.dimension.pageWidth,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexShrink: 1,
          }}
        >
          {mobileNavigationButton}
          {mobileNavigationMenu}
          {desktopNavigationMenu}
        </div>
        <div
          style={{
            flexShrink: 0,
            padding: '0px 32px',
          }}
        >
          <Image
            src={'/images/logo.svg'}
            alt={'Ams Date Picker Logo'}
            width={'160px'}
            height={AmsWebsiteStandards.dimension.navigationBarHeight}
            style={{
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};
