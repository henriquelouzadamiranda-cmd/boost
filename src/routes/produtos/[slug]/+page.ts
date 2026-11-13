import { error } from '@sveltejs/kit';
import { getProduct, products } from '$lib/data/products';

// Gera uma página estática para cada produto
export function entries() {
	return products.map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
	const product = getProduct(params.slug);

	if (!product) {
		error(404, 'Produto não encontrado');
	}

	return { product };
}
