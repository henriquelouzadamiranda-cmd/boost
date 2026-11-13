<script>
	import Hero from '$lib/components/hero.svelte';
	import About from '$lib/components/about.svelte';
	import Benefits from '$lib/components/benefits.svelte';
	import Products from '$lib/components/products.svelte';
	import Contact from '$lib/components/contact.svelte';
	import Location from '$lib/components/location.svelte';
	import Seo from '$lib/components/seo.svelte';
	import { organizationJsonLd, SITE_URL, SITE_NAME } from '$lib/seo';
	import { IconBrandWhatsappFilled } from '@tabler/icons-svelte';

	const jsonLd = [
		organizationJsonLd,
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: SITE_NAME,
			url: `${SITE_URL}/`,
			inLanguage: 'pt-BR'
		}
	];
</script>

<Seo
	title="Boost Auto Brasil | Importadora de Produtos Automotivos"
	description="Boost é uma importadora de produtos automotivos para distribuidoras e autopeças em todo o Brasil: RTV Silicone, Óleo Lubrificante GN-80, Limpa Contato e Descarbonizante."
	path="/"
	{jsonLd}
/>

<Hero />
<About />
<Benefits />
<Products />
<Location />
<Contact />

<a
	href="https://api.whatsapp.com/send?phone=5531998804464"
	target="_blank"
	rel="noopener noreferrer"
	aria-label="Fale com a Boost pelo WhatsApp"
>
	<IconBrandWhatsappFilled
		class="bottom-10 right-10 w-12 h-12 text-green-400 fixed z-10 hover:text-green-600"
	/>
</a>
