import { getPosts } from '$lib/data/posts';
import { products } from '$lib/data/products';
import { SITE_URL } from '$lib/seo';

// Gerado automaticamente no build: posts e produtos novos entram sozinhos no sitemap.
export const prerender = true;

export async function GET() {
	const posts = await getPosts();
	const today = new Date().toISOString().slice(0, 10);

	const urls = [
		{ loc: `${SITE_URL}/`, lastmod: today, priority: '1.0' },
		...products.map((p) => ({
			loc: `${SITE_URL}/produtos/${p.slug}`,
			lastmod: today,
			priority: '0.9'
		})),
		{ loc: `${SITE_URL}/blog`, lastmod: today, priority: '0.7' },
		...posts.map((post) => ({
			loc: `${SITE_URL}/blog/${post.slug}`,
			lastmod: new Date(post.date).toISOString().slice(0, 10),
			priority: '0.6'
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) =>
			`  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
