import React from 'react';
import { AmsDesign } from '../packages/support/standards';

const NotFoundPage = () => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '36px',
        fontWeight: '300',
        color: AmsDesign.color.gray[300],
        letterSpacing: '-0.01em',
      }}
    >
      This page is under construction.
    </div>
  );
};

export default NotFoundPage;
