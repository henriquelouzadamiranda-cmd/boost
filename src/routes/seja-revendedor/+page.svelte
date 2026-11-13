<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { products } from '$lib/data/products';
	import { condicoesRevenda, empresa, linkWhatsapp } from '$lib/data/empresa';
	import { CheckCircle2Icon, FileDownIcon, StoreIcon, TruckIcon, MessageCircleIcon } from '@lucide/svelte';
	import { IconBrandWhatsapp } from '@tabler/icons-svelte';

	let nome = $state('');
	let loja = $state('');
	let cnpj = $state('');
	let cidade = $state('');
	let telefone = $state('');
	let interesse = $state<string[]>([]);
	let mensagem = $state('');

	const inputClass =
		'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring';

	function enviar(e: SubmitEvent) {
		e.preventDefault();
		const texto = [
			'Olá! Quero ser revendedor Boost.',
			'',
			`Nome: ${nome}`,
			`Loja/Empresa: ${loja}`,
			cnpj && `CNPJ: ${cnpj}`,
			`Cidade/UF: ${cidade}`,
			telefone && `Telefone: ${telefone}`,
			interesse.length ? `Produtos de interesse: ${interesse.join(', ')}` : '',
			mensagem && `Mensagem: ${mensagem}`
		]
			.filter((linha) => !!linha)
			.join('\n');
		window.open(linkWhatsapp(texto), '_blank', 'noopener');
	}

	const passos = [
		{ icon: MessageCircleIcon, titulo: '1. Fale com a gente', texto: 'Preencha o formulário ou chame no WhatsApp.' },
		{ icon: StoreIcon, titulo: '2. Monte seu pedido', texto: 'Escolha os produtos e a quantidade de caixas.' },
		{ icon: TruckIcon, titulo: '3. Receba e venda', texto: 'Enviamos o pedido e você começa a vender Boost.' }
	];
</script>

<Seo
	title="Seja um revendedor Boost | Produtos automotivos para revenda"
	description="Revenda os produtos automotivos Boost na sua autopeças ou distribuidora: RTV Silicone, Óleo GN-80, Limpa Contato e Descarbonizante. Compre direto do importador."
	path="/seja-revendedor"
/>

<section class="pt-28 pb-16 bg-card">
	<div class="container mx-auto px-4 text-center max-w-3xl">
		<h1 class="text-4xl md:text-6xl font-bold mb-6">SEJA UM REVENDEDOR BOOST</h1>
		<p class="text-lg text-muted-foreground mb-8">
			Tem uma autopeças, distribuidora ou loja de produtos automotivos? Revenda a linha Boost
			comprando direto do importador.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button href="#formulario" size="lg" class="text-lg px-8">Quero revender</Button>
			<Button href="/catalogo-boost.pdf" variant="outline" size="lg" class="text-lg px-8 gap-2" download>
				<FileDownIcon class="size-5" /> Baixar catálogo
			</Button>
		</div>
	</div>
</section>

<section class="py-16 bg-background">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl md:text-4xl font-bold mb-10 text-center">POR QUE REVENDER BOOST</h2>
		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each condicoesRevenda as item}
				<div class="rounded-xl border bg-card p-6">
					<CheckCircle2Icon class="size-8 text-primary mb-4" />
					<h3 class="text-lg font-bold mb-2">{item.titulo}</h3>
					<p class="text-muted-foreground text-sm">{item.texto}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-16 bg-muted/30">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl md:text-4xl font-bold mb-10 text-center">COMO FUNCIONA</h2>
		<div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
			{#each passos as passo}
				<div class="flex flex-col items-center text-center gap-3">
					<div class="size-16 rounded-full bg-primary/20 flex items-center justify-center">
						<passo.icon class="size-8 text-primary" />
					</div>
					<h3 class="text-xl font-bold">{passo.titulo}</h3>
					<p class="text-muted-foreground">{passo.texto}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="py-16 bg-background">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl md:text-4xl font-bold mb-10 text-center">PRODUTOS PARA REVENDA</h2>
		<div class="overflow-x-auto max-w-5xl mx-auto">
			<table class="w-full text-sm border rounded-lg">
				<thead class="bg-muted/40">
					<tr>
						<th class="text-left p-3">Produto</th>
						<th class="text-left p-3">Embalagem</th>
						<th class="text-left p-3">Unidades por caixa</th>
						<th class="text-left p-3">Peso da caixa</th>
					</tr>
				</thead>
				<tbody>
					{#each products as p}
						<tr class="border-t">
							<td class="p-3 font-medium">
								<a href="/produtos/{p.slug}" class="hover:underline">{p.name}</a>
							</td>
							<td class="p-3">{p.specs[0].value}</td>
							<td class="p-3">{p.specs[1].value}</td>
							<td class="p-3">{p.specs[3].value}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

<section id="formulario" class="py-16 bg-card scroll-mt-20">
	<div class="container mx-auto px-4 max-w-2xl">
		<h2 class="text-3xl md:text-4xl font-bold mb-4 text-center">QUERO REVENDER</h2>
		<p class="text-muted-foreground text-center mb-8">
			Preencha e clique em enviar: a mensagem abre pronta no nosso WhatsApp.
		</p>

		<form class="space-y-4" onsubmit={enviar}>
			<div class="grid sm:grid-cols-2 gap-4">
				<label class="block text-sm font-medium">
					Seu nome *
					<input class="{inputClass} mt-1" bind:value={nome} required autocomplete="name" />
				</label>
				<label class="block text-sm font-medium">
					Nome da loja / empresa *
					<input class="{inputClass} mt-1" bind:value={loja} required autocomplete="organization" />
				</label>
				<label class="block text-sm font-medium">
					CNPJ
					<input class="{inputClass} mt-1" bind:value={cnpj} inputmode="numeric" />
				</label>
				<label class="block text-sm font-medium">
					Cidade / UF *
					<input class="{inputClass} mt-1" bind:value={cidade} required placeholder="Ex.: Contagem / MG" />
				</label>
				<label class="block text-sm font-medium sm:col-span-2">
					Telefone (se for diferente deste WhatsApp)
					<input class="{inputClass} mt-1" bind:value={telefone} type="tel" autocomplete="tel" />
				</label>
			</div>

			<fieldset>
				<legend class="text-sm font-medium mb-2">Produtos de interesse</legend>
				<div class="grid sm:grid-cols-2 gap-2">
					{#each products as p}
						<label class="flex items-center gap-2 text-sm">
							<input type="checkbox" value={p.name} bind:group={interesse} class="size-4" />
							{p.name}
						</label>
					{/each}
				</div>
			</fieldset>

			<label class="block text-sm font-medium">
				Mensagem
				<textarea class="{inputClass} mt-1" rows="3" bind:value={mensagem}></textarea>
			</label>

			<Button type="submit" size="lg" class="w-full gap-2 text-lg">
				<IconBrandWhatsapp class="size-5" /> Enviar pelo WhatsApp
			</Button>
			<p class="text-xs text-muted-foreground text-center">
				Prefere falar direto? <a href={linkWhatsapp('Olá! Quero ser revendedor Boost.')} target="_blank" rel="noopener noreferrer" class="underline">{empresa.whatsappExibicao}</a>
			</p>
		</form>
	</div>
</section>
