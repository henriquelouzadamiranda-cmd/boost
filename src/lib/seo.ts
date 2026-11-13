export const SITE_URL = 'https://boostautobrasil.com.br';
export const SITE_NAME = 'Boost Auto Brasil';
export const DEFAULT_IMAGE = '/imgs/produtos_boost.webp';
export const WHATSAPP = '+55-31-99880-4464';

/** Monta a URL absoluta a partir de um caminho ("/blog", "/imgs/x.webp"...). */
export function absoluteUrl(path = '/'): string {
	if (/^https?:\/\//.test(path)) return path;
	return SITE_URL + encodeURI(path.startsWith('/') ? path : `/${path}`);
}

/** Transforma um texto em URL amigável: minúsculas, sem acentos, com hífens. */
export function slugify(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export const organizationJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: SITE_NAME,
	alternateName: 'Boost',
	url: SITE_URL,
	logo: `${SITE_URL}/imgs/boost-logo.svg`,
	description:
		'Importadora de produtos automotivos para distribuidoras e autopeças em todo o Brasil.',
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Belo Horizonte',
		addressRegion: 'MG',
		addressCountry: 'BR'
	},
	sameAs: ['https://www.instagram.com/boost_brasil'],
	contactPoint: {
		'@type': 'ContactPoint',
		telephone: WHATSAPP,
		contactType: 'sales',
		areaServed: 'BR',
		availableLanguage: 'Portuguese'
	}
};
