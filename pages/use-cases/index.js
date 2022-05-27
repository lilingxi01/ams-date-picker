import React from 'react';
import Head from 'next/head';
import { Layout } from '../../components/layout';
import { AmsWebsiteStandards } from '../../support/website-standards';
import { getHeadTitle } from '../../support/head';

export default function UseCasesHome() {
  return (
    <Layout
      style={{
        paddingTop: AmsWebsiteStandards.dimension.navigationBarHeight,
      }}
    >
      <Head>
        <title>{getHeadTitle('Use Cases')}</title>
      </Head>
      <div>Use Cases Home</div>
    </Layout>
  );
}
