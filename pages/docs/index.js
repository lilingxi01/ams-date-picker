import React from 'react';
import Head from 'next/head';
import { Layout } from '../../components/layout';
import { AmsWebsiteStandards } from '../../support/website-standards';
import { getHeadTitle } from '../../support/head';

export default function DocumentationHome() {
  return (
    <Layout
      style={{
        paddingTop: AmsWebsiteStandards.dimension.navigationBarHeight,
      }}
    >
      <Head>
        <title>{getHeadTitle('Docs')}</title>
      </Head>
      <div>Documentation Home</div>
    </Layout>
  );
}
