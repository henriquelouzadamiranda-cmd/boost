<script lang="ts">
	import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { products } from '$lib/data/products';
	import { FileDownIcon } from '@lucide/svelte';
</script>

<section id="produtos" class="py-20 bg-muted/30">
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<h2 class="text-4xl md:text-5xl font-bold mb-4">NOSSOS PRODUTOS</h2>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each products as product}
				<Card class="overflow-hidden hover:shadow-lg-xl transition-shadow-lg duration-300 pt-0">
					<a href="/produtos/{product.slug}" class="aspect-square overflow-hidden block">
						<img
							src={product.image}
							alt="{product.name} Boost"
							class=" object-fill h-full hover:scale-105 transition-transform duration-300"
						/>
					</a>
					<CardHeader>
						<CardTitle class="text-xl">
							<a href="/produtos/{product.slug}" class="hover:text-primary transition-colors"
								>{product.name}</a
							>
						</CardTitle>
						<CardDescription>{product.description}</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button href="/produtos/{product.slug}" variant="outline" class="w-full"
							>Saiba mais</Button
						>
					</CardFooter>
				</Card>
			{/each}
		</div>

		<div class="mt-12 rounded-xl border bg-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
			<div class="text-center md:text-left">
				<p class="text-2xl font-bold mb-1">Catálogo de produtos Boost</p>
				<p class="text-muted-foreground">
					Todos os produtos, com descrição e dados das caixas, em um PDF para baixar ou enviar no WhatsApp.
				</p>
			</div>
			<Button href="/catalogo-boost.pdf" download size="lg" class="gap-2 shrink-0">
				<FileDownIcon class="size-5" /> Baixar catálogo (PDF)
			</Button>
		</div>
	</div>
</section>
