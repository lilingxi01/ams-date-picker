import React from 'react';
import Head from 'next/head';
import { AmsWebsiteStandards } from '../../support/website-standards';
import { getHeadTitle } from '../../support/head';
import { Layout } from '../../support/stitches.config';

export default function PageInstance() {
  return (
    <Layout
      style={{
        paddingTop: AmsWebsiteStandards.navigationBarHeight,
      }}
    >
      <Head>
        <title>{getHeadTitle('Docs')}</title>
      </Head>
      <div>Documentation Home</div>
    </Layout>
  );
}
