import React from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { styled } from '../../packages/support/stitches.config';
import { Layout } from '../../components/layout';
import { AmsWebsiteStandards } from '../../support/website-standards';

import { promises as fs } from 'fs';
import path from 'path';

const components = {};

const DocumentationContent = styled('div', {
  padding: '0 20px',
});

export default function AmsDocumentationPage({ source }) {
  return (
    <Layout
      style={{
        width: '100%',
        marginTop: AmsWebsiteStandards.dimension.navigationBarHeight,
        maxWidth: AmsWebsiteStandards.dimension.pageWidth,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Layout
        style={{
          width: '240px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          borderRight: '1px solid #e0e0e0',
          flexShrink: 0,
          padding: '30px',
        }}
      >
        Sidebar TODO
      </Layout>
      <DocumentationContent
        css={{
          width: '100%',
          flexShrink: 1,
        }}
      >
        <MDXRemote {...source} components={components} />
      </DocumentationContent>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const docsDir = path.join(process.cwd(), 'docs');
  const filenames = await fs.readdir(docsDir);

  const files = await Promise.all(filenames.map(async (filename) => {
    const filePath = path.join(docsDir, filename);
    const content = await fs.readFile(filePath, 'utf8');
    return {
      filename,
      content,
    };
  }));

  const paths = files.map((file) => {
    const { filename } = file;
    const id = filename.replace('.mdx', '');

    return {
      params: { id },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const docsDir = path.join(process.cwd(), 'docs');

  if (!params?.id) {
    return { notFound: true };
  }
  const filename = `${params.id}.mdx`;
  const file = await fs.readFile(path.join(docsDir, filename), 'utf-8');

  if (!file) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(file, { parseFrontmatter: true });
  return { props: { source: mdxSource } };
}
