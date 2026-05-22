/**
 * src/content/config.ts
 *
 * Define o schema dos artigos do blog (Astro Content Collections).
 *
 * Cada arquivo .md em src/content/blog/<vertical>/<slug>.md deve ter um
 * frontmatter que respeita esse schema. Se faltar campo obrigatório, o
 * build falha com erro de validação.
 *
 * Verticais permitidas: medicos, devs, advogados, criadores, saude, outras, geral
 *  - "geral" é pra artigos institucionais ou que cobrem múltiplas verticais
 *    (ex: "Fator R do Simples Nacional: guia completo")
 */

import { defineCollection, z } from 'astro:content';

const VERTICAIS_VALIDAS = [
  'medicos',
  'devs',
  'advogados',
  'criadores',
  'saude',
  'outras',
  'geral',
] as const;

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Campos obrigatórios
    title: z.string().min(10).max(120),
    description: z.string().min(80).max(160),
    vertical: z.enum(VERTICAIS_VALIDAS),
    publishedAt: z.date(),

    // Opcionais
    updatedAt: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),

    // FAQ no fim do artigo (vira FAQPage Schema automaticamente)
    faq: z.array(
      z.object({
        question: z.string().min(10).max(200),
        answer: z.string().min(20).max(800),
      })
    ).optional().default([]),

    // CTA do fim do artigo
    // - "whatsapp" (default): leva pro WhatsApp da Selvia
    // - "vertical": leva pra LP da vertical do artigo
    cta: z.enum(['whatsapp', 'vertical']).default('whatsapp'),
  }),
});

export const collections = {
  blog: blogCollection,
};
