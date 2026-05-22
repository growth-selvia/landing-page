/**
 * src/pages/blog/feed.xml.ts
 * Gera o RSS Feed do blog em /blog/feed.xml (sem stylesheet XSL).
 */

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getBlogPostUrl, getVerticalName } from '../../components/blog/blogHelpers.ts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const allPosts = await getCollection('blog', ({ data }) => !data.draft);
  const sortedPosts = allPosts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  return rss({
    title: 'Blog Selvia',
    description: 'Artigos sobre contabilidade, impostos e gestão de PJ para profissionais brasileiros. Escrito pela equipe Selvia (CRC GO-018845/O-3).',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: getBlogPostUrl(post),
      categories: [getVerticalName(post.data.vertical)],
      author: 'Selvia',
    })),
    customData: '<language>pt-BR</language>',
  });
}
