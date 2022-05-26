import React, { useState } from 'react';
import moment from 'moment';
import { AmsDateConflictResolver } from '../packages/date-picker/date-conflict-resolver.js';
import { AmsUserManual } from '../packages/user-manual';
import { styled } from '@stitches/react';
import { AmsDesign } from '../packages/support/standards.js';

const HeroSubtitle = styled('div', {
  fontSize: '18px',
  fontWeight: '400',
  color: AmsDesign.color.gray[400],
  letterSpacing: '-0.01em',
  '& b': {
    color: AmsDesign.color.gray[700],
  },
});

export default function Home() {
  const [date, setDate] = useState(moment('11/07/2021 1:00 AM'));

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '60px',
          backgroundColor: AmsDesign.color.gray[70],
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
          borderRadius: '8px',
        }}
      >
        <HeroSubtitle
          css={{
            padding: '40px 20px',
          }}
        >
          This project is still a <b>work in progress</b>.
        </HeroSubtitle>
      </div>
      <div
        style={{
          width: '100%',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          rowGap: '15px',
          borderBottom: `1px solid ${AmsDesign.color.gray[200]}`,
        }}
      >
        <div
          style={{
            fontSize: '50px',
            fontWeight: '600',
            background: '-webkit-linear-gradient(#0688ff4f, #0f0f0f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.01em',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: '20px',
            paddingBottom: '3px',
            userSelect: 'none',
          }}
        >
          <div>Modern</div>
          <div>Magical</div>
          <div>Comfortable</div>
        </div>
        <HeroSubtitle>
          A <b>modern</b>, <b>efficient</b>, and <b>intuitive</b> way to select the date and time.
        </HeroSubtitle>
        <HeroSubtitle>
          A <b>magical</b> React date picker you always wanted.
        </HeroSubtitle>
        <HeroSubtitle>
          Users will thank you <b>so much</b> by having this.
        </HeroSubtitle>
      </div>
      <div
        style={{
          width: '100%',
          padding: '30px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: '20px',
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
    </div>
  );
}
