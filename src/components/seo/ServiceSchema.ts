/**
 * src/components/seo/ServiceSchema.ts
 *
 * Gera JSON-LD Service schema específico por vertical.
 *
 * Convertido de .astro pra .ts porque é função pura (sem markup).
 * O .astro original ainda existe mas não é mais usado — pode ser deletado depois.
 *
 * Service schema diz pro Google e LLMs: esta página é sobre o serviço X,
 * prestado pela empresa Y, com tal preço e disponibilidade.
 *
 * Permite rich results no Google Search e citações estruturadas em LLMs
 * tipo "qual o melhor contador para devs?".
 */

import { getVertical } from '../../data/verticais.ts';
import { getVerticalContent } from '../../data/vertical-content.ts';

export interface ServiceSchemaParams {
  slug: string;
  siteUrl: URL | undefined;  // Astro.site
  pageSlug?: string;          // se a URL difere do slug (ex: 'outras' → 'outras-pj')
}

export function getServiceSchema({ slug, siteUrl, pageSlug }: ServiceSchemaParams) {
  const vertical = getVertical(slug);
  const content = getVerticalContent(slug);

  if (!vertical) {
    throw new Error(`getServiceSchema: vertical "${slug}" não encontrada`);
  }

  // Plano "featured" (geralmente Simples Nacional) — pra preço mínimo no schema
  const featuredPlan = vertical.plans.find((p) => p.featured) || vertical.plans[0];

  // URL canônica da LP vertical
  const urlSlug = pageSlug || slug;
  const pageUrl = siteUrl ? new URL(`/${urlSlug}`, siteUrl).href : `/${urlSlug}`;

  // Extrai número limpo do preço (ex: "R$ 347" → 347)
  const priceNumber = featuredPlan?.price
    ? parseInt(featuredPlan.price.replace(/\D/g, ''), 10)
    : null;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Contabilidade para ${vertical.name}`,
    description: content.serviceDescription,
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      name: 'Selvia',
      url: siteUrl?.href,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    serviceType: 'Contabilidade',
    audience: {
      '@type': 'Audience',
      audienceType: vertical.name,
    },
  };

  if (priceNumber) {
    schema.offers = {
      '@type': 'Offer',
      price: priceNumber.toString(),
      priceCurrency: 'BRL',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: priceNumber.toString(),
        priceCurrency: 'BRL',
        unitText: 'MONTH',
      },
      availability: 'https://schema.org/InStock',
    };
  }

  return schema;
}
