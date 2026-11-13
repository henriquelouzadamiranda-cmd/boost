<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft } from '@lucide/svelte';
	import { IconBrandWhatsapp } from '@tabler/icons-svelte';
	import { ShoppingCartIcon, MapPinIcon, FileDownIcon } from '@lucide/svelte';
	import { SITE_URL, SITE_NAME } from '$lib/seo';
	import { empresa, linkWhatsapp } from '$lib/data/empresa';

	let { data } = $props();
	const product = $derived(data.product);

	const whatsappLink = $derived(
		linkWhatsapp(`Olá! Tenho interesse em revender o produto ${product.name} da Boost.`)
	);
	const mercadoLivreLink = $derived(product.mercadoLivre || empresa.mercadoLivreLoja);

	const breadcrumb = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
			{ '@type': 'ListItem', position: 2, name: 'Produtos', item: `${SITE_URL}/#produtos` },
			{
				'@type': 'ListItem',
				position: 3,
				name: product.name,
				item: `${SITE_URL}/produtos/${product.slug}`
			}
		]
	});
</script>

<Seo
	title={product.seoTitle}
	description={product.seoDescription}
	path="/produtos/{product.slug}"
	image={product.image}
	jsonLd={breadcrumb}
/>

<article class="container mx-auto px-4 py-24 max-w-5xl">
	<Button
		href="/#produtos"
		variant="ghost"
		class="mb-8 pl-0 hover:pl-2 transition-all gap-2 text-muted-foreground"
	>
		<ArrowLeft size={20} />
		Ver todos os produtos
	</Button>

	<div class="grid md:grid-cols-2 gap-10 items-start">
		<div class="aspect-square overflow-hidden rounded-xl border bg-card">
			<img
				src={product.image}
				alt="{product.name} Boost"
				class="w-full h-full object-cover"
				width="800"
				height="800"
			/>
		</div>

		<div class="space-y-6">
			<h1 class="text-3xl md:text-5xl font-bold text-primary leading-tight">
				{product.name} Boost
			</h1>
			<p class="text-xl text-muted-foreground">{product.description}</p>

			<div class="text-foreground/90 leading-relaxed">
				{@html product.desc}
			</div>

			<div>
				<h2 class="text-xl font-bold mb-3">Informações para distribuidores</h2>
				<table class="w-full text-sm border rounded-lg overflow-hidden">
					<tbody>
						{#each product.specs as spec}
							<tr class="border-b last:border-0">
								<th class="text-left font-medium p-3 bg-muted/40 w-1/2">{spec.label}</th>
								<td class="p-3">{spec.value}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="rounded-xl border bg-card p-4 space-y-3">
				<p class="font-semibold">Quer comprar para usar?</p>
				<div class="grid sm:grid-cols-2 gap-3">
					<Button
						href={mercadoLivreLink}
						target="_blank"
						rel="noopener noreferrer"
						class="gap-2 bg-yellow-400 text-black hover:bg-yellow-300"
					>
						<ShoppingCartIcon class="size-5" /> Comprar no Mercado Livre
					</Button>
					<Button href="/onde-comprar" variant="outline" class="gap-2">
						<MapPinIcon class="size-5" /> Lojas perto de você
					</Button>
				</div>
			</div>

			<div class="rounded-xl border bg-card p-4 space-y-3">
				<p class="font-semibold">Tem uma loja ou distribuidora?</p>
				<Button href={whatsappLink} target="_blank" rel="noopener noreferrer" class="w-full gap-2">
					<IconBrandWhatsapp class="size-5" /> Quero revender este produto
				</Button>
				<div class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
					<a href="/seja-revendedor" class="underline text-muted-foreground hover:text-foreground"
						>Condições para revenda</a
					>
					<a href="/catalogo-boost.pdf" download class="underline text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
						><FileDownIcon class="size-4" /> Catálogo (PDF)</a
					>
					{#if product.fichaTecnica}
						<a href={product.fichaTecnica} target="_blank" rel="noopener noreferrer" class="underline text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
							><FileDownIcon class="size-4" /> Ficha técnica / FISPQ</a
						>
					{:else}
						<a
							href={linkWhatsapp(`Olá! Pode me enviar a ficha técnica/FISPQ do ${product.name} Boost?`)}
							target="_blank"
							rel="noopener noreferrer"
							class="underline text-muted-foreground hover:text-foreground">Pedir ficha técnica / FISPQ</a
						>
					{/if}
				</div>
			</div>

			{#if product.blogSlug}
				<p class="text-sm text-muted-foreground">
					Saiba mais no nosso blog:
					<a href="/blog/{product.blogSlug}" class="underline hover:text-foreground"
						>{product.name}: para que serve e como usar</a
					>
				</p>
			{/if}
		</div>
	</div>
</article>
