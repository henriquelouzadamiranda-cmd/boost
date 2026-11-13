<script lang="ts">
	import { SITE_NAME, DEFAULT_IMAGE, absoluteUrl } from '$lib/seo';

	type Props = {
		title: string;
		description: string;
		path: string;
		image?: string;
		type?: 'website' | 'article';
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	};

	let { title, description, path, image = DEFAULT_IMAGE, type = 'website', jsonLd }: Props =
		$props();

	const url = $derived(absoluteUrl(path));
	const imageUrl = $derived(absoluteUrl(image));
	// "<" escapado para o JSON nunca fechar a tag <script> sem querer
	const jsonLdString = $derived(jsonLd ? JSON.stringify(jsonLd).replace(/</g, '\\u003c') : '');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	{#if jsonLdString}
		{@html `<script type="application/ld+json">${jsonLdString}</script>`}
	{/if}
</svelte:head>
