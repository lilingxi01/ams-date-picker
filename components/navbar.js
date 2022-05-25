import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AmsWebsiteStandards } from '../support/website-standards.js';
import { styled } from '@stitches/react';
import { AmsDesign } from '../packages/support/standards.js';

const navigationItems = [
  {
    name: 'Home',
    url: '/',
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
  color: AmsDesign.color.gray[400],
  textDecoration: 'none',
  transition: AmsDesign.transition.cubic,
  '&:hover': {
    color: AmsDesign.color.accentColor,
  },
});

export const AmsNavigationBar = () => {
  return (
    <div
      style={{
        width: '100%',
        height: AmsWebsiteStandards.dimension.navigationBarHeight,
        position: 'sticky',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fefefe',
        borderBottom: `1px solid ${AmsDesign.color.gray[200]}`,
      }}
    >
      <div
        style={{
          width: '100%',
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '35px',
          columnGap: '25px',
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
              >
                {item.name}
              </AmsNavigationItem>
            </Link>
          ))
        }
      </div>
      <div
        style={{
          flexShrink: 0,
          padding: '0px 34px',
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
  );
};
