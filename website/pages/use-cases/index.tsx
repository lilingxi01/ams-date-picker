import React from 'react';
import { DefinedSEO } from '../../components/seo';
import { DefinedContainer } from '../../components/container';

export default function PageInstance() {
  return (
    <DefinedContainer>
      <DefinedSEO
        pageTitle={'Use Cases'}
        avoidIndexing={true}
      />
      <div>Use Cases Home</div>
    </DefinedContainer>
  );
}
