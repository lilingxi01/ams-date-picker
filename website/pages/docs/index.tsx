import React from 'react';
import { DefinedSEO } from '../../components/seo';
import { DefinedContainer } from '../../components/container';

export default function PageInstance() {
  return (
    <DefinedContainer
      css={{
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <DefinedSEO
        pageTitle={'Docs'}
        avoidIndexing={true}
      />
      <div>Documentation Pending</div>
    </DefinedContainer>
  );
}
