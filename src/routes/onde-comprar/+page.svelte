<script lang="ts">
	import { onMount } from 'svelte';
	import Seo from '$lib/components/seo.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { revendedores, type Revendedor } from '$lib/data/revendedores';
	import { empresa } from '$lib/data/empresa';
	import { LocateFixedIcon, MapPinIcon, SearchIcon, ShoppingCartIcon, StoreIcon } from '@lucide/svelte';

	// Leaflet é carregado do CDN só nesta página (mapa gratuito, OpenStreetMap)
	const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
	const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';

	type ComDistancia = Revendedor & { distancia?: number };

	let busca = $state('');
	let minhaPosicao = $state<{ lat: number; lng: number } | null>(null);
	let statusLocalizacao = $state('');
	let mapaEl = $state<HTMLDivElement>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let L: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let mapa: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const marcadores = new Map<Revendedor, any>();

	function normalizar(t: string) {
		return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
	}

	function distanciaKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
		const R = 6371;
		const dLat = ((b.lat - a.lat) * Math.PI) / 180;
		const dLng = ((b.lng - a.lng) * Math.PI) / 180;
		const x =
			Math.sin(dLat / 2) ** 2 +
			Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
		return 2 * R * Math.asin(Math.sqrt(x));
	}

	const lista = $derived.by(() => {
		const termo = normalizar(busca.trim());
		let itens: ComDistancia[] = revendedores
			.filter(
				(r) => !termo || normalizar(`${r.nome} ${r.cidade} ${r.uf} ${r.endereco}`).includes(termo)
			)
			.map((r) => ({ ...r, distancia: minhaPosicao ? distanciaKm(minhaPosicao, r) : undefined }));
		if (minhaPosicao) itens = itens.sort((a, b) => (a.distancia ?? 0) - (b.distancia ?? 0));
		return itens;
	});

	function carregarLeaflet(): Promise<void> {
		return new Promise((resolve, reject) => {
			if ((window as any).L) return resolve();
			const css = document.createElement('link');
			css.rel = 'stylesheet';
			css.href = LEAFLET_CSS;
			document.head.appendChild(css);
			const js = document.createElement('script');
			js.src = LEAFLET_JS;
			js.onload = () => resolve();
			js.onerror = reject;
			document.head.appendChild(js);
		});
	}

	onMount(() => {
		carregarLeaflet().then(() => {
			L = (window as any).L;
			mapa = L.map(mapaEl, { scrollWheelZoom: false }).setView([-15.8, -47.9], 4);
			L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
				maxZoom: 19
			}).addTo(mapa);

			for (const r of revendedores) {
				const m = L.circleMarker([r.lat, r.lng], {
					radius: 9,
					color: '#ffffff',
					weight: 2,
					fillColor: '#facc15',
					fillOpacity: 1
				})
					.addTo(mapa)
					.bindPopup(
						`<strong>${r.nome}</strong><br>${r.endereco}<br>${r.cidade} - ${r.uf}${
							r.telefone ? `<br>${r.telefone}` : ''
						}<br><a href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}" target="_blank" rel="noopener">Como chegar</a>`
					);
				marcadores.set(r, m);
			}
			if (revendedores.length > 1) {
				mapa.fitBounds(L.latLngBounds(revendedores.map((r) => [r.lat, r.lng])), { padding: [40, 40] });
			} else if (revendedores.length === 1) {
				mapa.setView([revendedores[0].lat, revendedores[0].lng], 12);
			}
		});
		return () => mapa?.remove();
	});

	function usarMinhaLocalizacao() {
		if (!navigator.geolocation) {
			statusLocalizacao = 'Seu navegador não permite localização.';
			return;
		}
		statusLocalizacao = 'Buscando sua localização...';
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				minhaPosicao = { lat: pos.coords.latitude, lng: pos.coords.longitude };
				statusLocalizacao = 'Lojas ordenadas da mais próxima para a mais distante.';
				if (mapa && L) {
					L.circleMarker([minhaPosicao.lat, minhaPosicao.lng], {
						radius: 7,
						color: '#ffffff',
						weight: 2,
						fillColor: '#3b82f6',
						fillOpacity: 1
					})
						.addTo(mapa)
						.bindPopup('Você está aqui');
					const maisProxima = lista[0];
					if (maisProxima) {
						mapa.fitBounds(
							L.latLngBounds([
								[minhaPosicao.lat, minhaPosicao.lng],
								[maisProxima.lat, maisProxima.lng]
							]),
							{ padding: [60, 60], maxZoom: 13 }
						);
					} else {
						mapa.setView([minhaPosicao.lat, minhaPosicao.lng], 11);
					}
				}
			},
			() => {
				statusLocalizacao = 'Não foi possível pegar sua localização. Busque pela sua cidade.';
			},
			{ enableHighAccuracy: false, timeout: 10000 }
		);
	}

	function mostrarNoMapa(r: Revendedor) {
		const original = revendedores.find((x) => x.nome === r.nome && x.lat === r.lat && x.lng === r.lng);
		const m = original && marcadores.get(original);
		if (mapa && m) {
			mapa.setView([r.lat, r.lng], 15);
			m.openPopup();
			mapaEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
</script>

<Seo
	title="Onde comprar produtos Boost | Lojas e revendedores"
	description="Encontre lojas e autopeças que vendem os produtos Boost perto de você, ou compre online pelo Mercado Livre."
	path="/onde-comprar"
/>

<section class="pt-28 pb-10 bg-card">
	<div class="container mx-auto px-4 text-center max-w-3xl">
		<h1 class="text-4xl md:text-6xl font-bold mb-4">ONDE COMPRAR</h1>
		<p class="text-lg text-muted-foreground">
			Encontre a loja Boost mais perto de você ou compre online.
		</p>
	</div>
</section>

<section class="py-10 bg-background">
	<div class="container mx-auto px-4">
		<div class="flex flex-col md:flex-row gap-3 mb-6 max-w-4xl mx-auto">
			<label class="relative grow">
				<span class="sr-only">Buscar por cidade</span>
				<SearchIcon class="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
				<input
					bind:value={busca}
					placeholder="Digite sua cidade ou estado"
					class="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
				/>
			</label>
			<Button onclick={usarMinhaLocalizacao} class="gap-2">
				<LocateFixedIcon class="size-4" /> Usar minha localização
			</Button>
		</div>
		{#if statusLocalizacao}
			<p class="text-sm text-muted-foreground text-center mb-4">{statusLocalizacao}</p>
		{/if}

		<div class="grid lg:grid-cols-3 gap-6">
			<div class="lg:col-span-2 relative">
				<div
					bind:this={mapaEl}
					class="h-[420px] md:h-[560px] w-full rounded-xl overflow-hidden border z-0"
				></div>
				{#if revendedores.length === 0}
					<div
						class="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl z-[500] p-6 text-center"
					>
						<div>
							<MapPinIcon class="size-12 mx-auto mb-3 text-white" />
							<p class="text-white text-lg font-semibold">Mapa de lojas em breve</p>
							<p class="text-white/80 text-sm">Enquanto isso, compre online ou fale com a gente.</p>
						</div>
					</div>
				{/if}
			</div>

			<div class="space-y-3 lg:max-h-[560px] lg:overflow-y-auto pr-1">
				{#each lista as r}
					<button
						type="button"
						onclick={() => mostrarNoMapa(r)}
						class="w-full text-left rounded-xl border bg-card p-4 hover:border-primary transition-colors"
					>
						<div class="flex justify-between gap-2">
							<p class="font-semibold">{r.nome}</p>
							{#if r.distancia !== undefined}
								<span class="text-sm text-primary whitespace-nowrap"
									>{r.distancia < 10 ? r.distancia.toFixed(1) : Math.round(r.distancia)} km</span
								>
							{/if}
						</div>
						<p class="text-sm text-muted-foreground">{r.endereco}</p>
						<p class="text-sm text-muted-foreground">{r.cidade} - {r.uf}</p>
						{#if r.telefone}<p class="text-sm mt-1">{r.telefone}</p>{/if}
					</button>
				{:else}
					<div class="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
						{#if revendedores.length}
							Nenhuma loja encontrada para "{busca}". Compre online ou fale com a gente pelo WhatsApp.
						{:else}
							Estamos cadastrando as lojas parceiras. Compre online ou fale com a gente.
						{/if}
					</div>
				{/each}

				<div class="rounded-xl border bg-card p-4 space-y-3">
					<p class="font-semibold flex items-center gap-2"><ShoppingCartIcon class="size-4" /> Compre online</p>
					<Button
						href={empresa.mercadoLivreLoja}
						target="_blank"
						rel="noopener noreferrer"
						class="w-full bg-yellow-400 text-black hover:bg-yellow-300">Ver no Mercado Livre</Button
					>
				</div>
				<div class="rounded-xl border bg-card p-4 space-y-3">
					<p class="font-semibold flex items-center gap-2"><StoreIcon class="size-4" /> Quer vender Boost na sua loja?</p>
					<Button href="/seja-revendedor" variant="outline" class="w-full">Seja revendedor</Button>
				</div>
			</div>
		</div>
	</div>
</section>
