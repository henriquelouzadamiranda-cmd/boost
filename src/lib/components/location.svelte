<script lang="ts">
	import { MapPinIcon, ShoppingCartIcon, StoreIcon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { empresa } from '$lib/data/empresa';

	const opcoes = [
		{
			icon: ShoppingCartIcon,
			titulo: 'Compre online',
			texto: 'Receba em casa comprando pelo Mercado Livre.',
			botao: 'Ver no Mercado Livre',
			href: empresa.mercadoLivreLoja,
			externo: true
		},
		{
			icon: MapPinIcon,
			titulo: 'Encontre uma loja',
			texto: 'Veja no mapa as lojas que vendem Boost perto de você.',
			botao: 'Ver lojas no mapa',
			href: '/onde-comprar',
			externo: false
		},
		{
			icon: StoreIcon,
			titulo: 'Revenda Boost',
			texto: 'Tem autopeças ou distribuidora? Compre direto do importador.',
			botao: 'Seja revendedor',
			href: '/seja-revendedor',
			externo: false
		}
	];
</script>

<section id="onde-comprar" class="py-20 bg-background">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-4xl md:text-5xl font-bold mb-4">ONDE COMPRAR</h2>
			<p class="text-muted-foreground max-w-2xl mx-auto">
				Compre online, encontre uma loja perto de você ou revenda os produtos Boost.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
			{#each opcoes as op}
				<div class="rounded-xl border bg-card p-6 flex flex-col items-center text-center gap-4">
					<div class="size-14 rounded-full bg-primary/20 flex items-center justify-center">
						<op.icon class="size-7 text-primary" />
					</div>
					<h3 class="text-xl font-bold">{op.titulo}</h3>
					<p class="text-muted-foreground grow">{op.texto}</p>
					<Button
						href={op.href}
						variant={op.externo ? 'default' : 'outline'}
						class="w-full {op.externo ? 'bg-yellow-400 text-black hover:bg-yellow-300' : ''}"
						target={op.externo ? '_blank' : undefined}
						rel={op.externo ? 'noopener noreferrer' : undefined}>{op.botao}</Button
					>
				</div>
			{/each}
		</div>
	</div>
</section>
