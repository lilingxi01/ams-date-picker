import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Layout } from '../support/stitches.config';
import { DefinedTransition } from '../support/transition';
import { IconMoon, IconSun, IconSunrise, IconSunset } from '@tabler/icons';

export function MiniColorModeSwitcher() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Layout
      css={{
        width: 32,
        height: 32,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '$mauve10',
        backgroundColor: '$mauveA1',
        border: '1px solid $mauveA2',
        borderRadius: '$base',
        cursor: 'pointer',
        userSelect: 'none',
        transition: DefinedTransition.cubic(),
        fontSize: '$xs',
        fontWeight: 400,
        '@sm': {
          '&:hover': {
            color: '$mauve12',
            backgroundColor: '$mauveA3',
          },
        },
        '&:active': {
          transform: 'scale(0.92)',
        },
        '& .icon': {
          width: 16,
          height: 16,
        },
      }}
      onClick={() => {
        if (theme === 'system') {
          setTheme('light');
        } else if (theme === 'light') {
          setTheme('dark');
        } else {
          setTheme('system');
        }
      }}
    >
      {
        theme === 'system'
          ? (
            // <IconShadow strokeWidth={1.6}/>
            systemTheme === 'dark'
              ? <IconSunset strokeWidth={1.6}/>
              : <IconSunrise strokeWidth={1.6}/>
          )
          : (
            theme === 'dark'
              ? <IconMoon strokeWidth={1.6}/>
              : <IconSun strokeWidth={1.6}/>
          )
      }
    </Layout>
  ) : (
    <Layout
      css={{
        width: 32,
        height: 32,
        color: '$mauveA8',
        backgroundColor: '$mauveA1',
        border: '1px solid $mauveA2',
        borderRadius: '$base',
        pointerEvents: 'none',
      }}
    />
  );
}
