<script lang="ts">
	import { IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-svelte';
	import { empresa, linkWhatsapp } from '$lib/data/empresa';
	import { products } from '$lib/data/products';
</script>

<footer class="bg-background border-t border-border pt-12 pb-8">
	<div class="container mx-auto px-4">
		<div class="grid gap-8 md:grid-cols-4">
			<div class="space-y-3">
				<a href="/" class="inline-block">
					<img src="/imgs/boost-logo.svg" alt="logo Boost" class="max-w-36" />
				</a>
				<p class="text-sm text-muted-foreground">
					Importadora de produtos automotivos para distribuidoras e autopeças em todo o Brasil.
				</p>
				<p class="text-sm text-muted-foreground">{empresa.cidade}</p>
				{#if empresa.cnpj}<p class="text-sm text-muted-foreground">CNPJ {empresa.cnpj}</p>{/if}
				{#if empresa.endereco}<p class="text-sm text-muted-foreground">{empresa.endereco}</p>{/if}
			</div>

			<div>
				<p class="font-semibold mb-3">Produtos</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					{#each products as p}
						<li><a href="/produtos/{p.slug}" class="hover:text-foreground">{p.name}</a></li>
					{/each}
				</ul>
			</div>

			<div>
				<p class="font-semibold mb-3">Boost</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li><a href="/seja-revendedor" class="hover:text-foreground">Seja revendedor</a></li>
					<li><a href="/onde-comprar" class="hover:text-foreground">Onde comprar</a></li>
					<li>
						<a href={empresa.mercadoLivreLoja} target="_blank" rel="noopener noreferrer" class="hover:text-foreground"
							>Mercado Livre</a
						>
					</li>
					<li><a href="/catalogo-boost.pdf" download class="hover:text-foreground">Catálogo (PDF)</a></li>
					<li><a href="/blog" class="hover:text-foreground">Blog</a></li>
				</ul>
			</div>

			<div>
				<p class="font-semibold mb-3">Contato</p>
				<ul class="space-y-2 text-sm text-muted-foreground">
					<li>
						<a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" class="hover:text-foreground inline-flex items-center gap-2"
							><IconBrandWhatsapp class="size-4" /> {empresa.whatsappExibicao}</a
						>
					</li>
					<li><a href="mailto:{empresa.email}" class="hover:text-foreground">{empresa.email}</a></li>
					<li>
						<a href={empresa.instagram} target="_blank" rel="noopener noreferrer" class="hover:text-foreground inline-flex items-center gap-2"
							><IconBrandInstagram class="size-4" /> {empresa.instagramUsuario}</a
						>
					</li>
				</ul>
			</div>
		</div>

		<p class="text-xs text-muted-foreground text-center mt-10">
			© {new Date().getFullYear()} Boost. Todos os direitos reservados.
		</p>
	</div>
</footer>
