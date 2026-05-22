/**
 * src/components/seo/ArticleSchema.ts
 *
 * Gera JSON-LD Article schema pra páginas de artigo do blog.
 *
 * Article schema é o que faz o Google mostrar rich results na busca
 * (data, autor, imagem destacada) e LLMs entenderem que aquela página
 * é um artigo (não uma landing page ou produto).
 *
 * Inclui:
 *   - @type Article
 *   - headline, description, datePublished, dateModified
 *   - author como Organization (Selvia) com CRC
 *   - publisher (Selvia)
 *   - mainEntityOfPage (URL canônica)
 *
 * Decisão: autoria é "Selvia" como Organization (não Person), com CRC
 * GO-018845/O-3 como identifier. Trade-off de E-E-A-T menor mas operação
 * mais simples (não precisa pegar CV/foto de cada contador).
 */

export interface ArticleSchemaParams {
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  updatedAt?: Date;
  siteUrl: URL | undefined;
}

export function getArticleSchema({
  title,
  description,
  url,
  publishedAt,
  updatedAt,
  siteUrl,
}: ArticleSchemaParams) {
  const logoUrl = siteUrl ? new URL('/logo.png', siteUrl).href : '/logo.png';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    datePublished: publishedAt.toISOString(),
    dateModified: (updatedAt || publishedAt).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Selvia',
      url: siteUrl?.href,
      identifier: 'CRC GO-018845/O-3',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Selvia',
      url: siteUrl?.href,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Gera FAQPage schema do artigo se ele tiver FAQs no frontmatter.
 * Retorna null se não tiver FAQ (pra evitar schema vazio).
 */
export function getArticleFaqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}
