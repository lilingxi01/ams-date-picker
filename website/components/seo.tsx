import Head from 'next/head';
import { getHeadTitle } from '../support/head';

export type DefinedSEOProps = {
  pageTitle: string | null;
  pageDescription?: string;
  avoidIndexing?: boolean;
};

export function DefinedSEO({
  pageTitle,
  pageDescription,
  avoidIndexing = false,
}: DefinedSEOProps) {
  return (
    <Head>
      <title>{getHeadTitle(pageTitle)}</title>
      {pageDescription && (
        <meta
          name="description"
          content={pageDescription}
          key="desc"
        />
      )}
      {avoidIndexing && (
        <meta name="robots" content="noindex" key="robots" />
      )}
    </Head>
  );
}
