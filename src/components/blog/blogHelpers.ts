/**
 * src/components/blog/blogHelpers.ts
 *
 * Funções utilitárias compartilhadas entre as páginas do blog.
 * Mantém a lógica de URL building, formatação de data e nomes de
 * verticais centralizada (DRY).
 */

import type { CollectionEntry } from 'astro:content';

export function getCleanSlug(entry: CollectionEntry<'blog'>): string {
  const parts = entry.slug.split('/');
  return parts[parts.length - 1];
}

export function getBlogPostUrl(entry: CollectionEntry<'blog'>): string {
  return '/blog/' + entry.data.vertical + '/' + getCleanSlug(entry);
}

export function formatBlogDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function calculateReadingTime(body: string): number {
  const wordCount = (body || '').trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export const VERTICAL_NAMES: Record<string, string> = {
  medicos: 'Médicos',
  devs: 'Devs e TI',
  advogados: 'Advogados',
  criadores: 'Criadores',
  saude: 'Saúde',
  outras: 'Outras PJ',
  geral: 'Geral',
};

export function getVerticalName(vertical: string): string {
  return VERTICAL_NAMES[vertical] || vertical;
}
