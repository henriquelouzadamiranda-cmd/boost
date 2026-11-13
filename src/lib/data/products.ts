export type Product = {
	slug: string;
	name: string;
	/** Frase curta mostrada no card da página inicial */
	description: string;
	/** Título e descrição que aparecem no Google */
	seoTitle: string;
	seoDescription: string;
	image: string;
	/** Texto completo (aceita HTML simples) */
	desc: string;
	specs: { label: string; value: string }[];
	/** slug do post do blog relacionado (opcional) */
	blogSlug?: string;
};

const specsLata = [
	{ label: 'Quantidade por lata', value: '250 ml / 155 g' },
	{ label: 'Latas por caixa', value: '24 latas' },
	{ label: 'Dimensões da caixa', value: '32 × 21,3 × 20,7 cm' },
	{ label: 'Peso bruto por caixa', value: '5,6 kg' }
];

export const products: Product[] = [
	{
		slug: 'rtv-silicone',
		name: 'RTV Silicone',
		description: 'Vedação perfeita e resistente.',
		seoTitle: 'RTV Silicone Automotivo Alta Temperatura | Boost',
		seoDescription:
			'RTV Silicone Boost: formador de juntas de alta temperatura (até 315 °C), resistente a óleo e água. Caixa com 144 tubos de 105 g para distribuidoras e autopeças.',
		image: '/imgs/boost_rtv-silicone.webp',
		desc: "Formador de juntas de alta temperatura, resiste a óleos, água aditivada com glicóis, graxas e fluidos em geral, e não danifica sensores de oxigênio.<br><br><strong>Características:</strong> resistente à alta temperatura e a mudanças causadas por ciclos térmicos. Alta flexibilidade e resistência à temperatura, estável em trabalhos até 315 °C, com picos de até 343 °C.<br><br><strong>Ideal para:</strong> tampas de distribuição; caixa de câmbio; termostato; cilindros; tampa de cárter; coletor de admissão; bomba d'água; tampa de válvulas; flanges de cubo de rodas; sensores de temperatura; flanges do carburador; injeção eletrônica.<br><br>Seca e sela como uma junta. Cura totalmente entre 18 e 24 horas.",
		specs: [
			{ label: 'Quantidade por tubo', value: '105 g' },
			{ label: 'Tubos por caixa', value: '144 tubos' },
			{ label: 'Dimensões da caixa', value: '50,5 × 26 × 43 cm' },
			{ label: 'Peso bruto por caixa', value: '21,5 kg' }
		],
		blogSlug: 'rtv-silicone-automotivo-vedacao-profissional-para-evitar-vazamentos-e-retrabalho'
	},
	{
		slug: 'oleo-lubrificante-gn-80',
		name: 'Óleo Lubrificante GN-80',
		description: 'Lubrifica, remove e protege.',
		seoTitle: 'Óleo Lubrificante Multiuso GN-80 Spray 250 ml | Boost',
		seoDescription:
			'Óleo Lubrificante GN-80 Boost: spray multiuso que lubrifica, protege contra corrosão, remove óxidos e solta peças travadas. Caixa com 24 latas de 250 ml.',
		image: '/imgs/boost_oleo-lubrificante-gn-80.webp',
		desc: 'O Óleo Lubrificante GN-80 da Boost é um spray supermultiuso com ação profissional para lubrificação, proteção anticorrosiva e desengorduramento. Com sua fórmula de alta potência, ele remove óxidos e solta peças travadas, como parafusos e dobradiças. Disponível em embalagem spray 250 ml / 155 g, é um verdadeiro aliado para manutenção eficiente.',
		specs: specsLata,
		blogSlug: 'oleo-lubrificante-gn-80-solucao-multiuso-para-manutencao-automotiva'
	},
	{
		slug: 'limpa-contato',
		name: 'Limpa Contato',
		description: 'Limpeza que restaura a performance elétrica.',
		seoTitle: 'Limpa Contato Spray Automotivo 250 ml | Boost',
		seoDescription:
			'Limpa Contato Boost: spray de secagem rápida que remove sujeira, óleo e umidade de contatos elétricos e eletrônicos, evitando falhas. Caixa com 24 latas.',
		image: '/imgs/boost_limpa-contato.webp',
		desc: 'O Limpa Contato Boost é um spray de ação instantânea, desenvolvido para restaurar a condutividade e garantir a limpeza de contatos elétricos e eletrônicos. Sua fórmula de secagem rápida remove sujeira, poeira, óleo e gordura, protegendo contra umidade e evitando falhas elétricas. Ideal para uso automotivo, motocicletas e eletrônicos, o produto também oferece proteção antiferrugem.',
		specs: specsLata,
		blogSlug: 'limpa-contato-automotivo-eficiencia-eletrica-e-protecao-contra-falhas'
	},
	{
		slug: 'descarbonizante',
		name: 'Descarbonizante',
		description: 'Limpeza profunda do sistema de admissão.',
		seoTitle: 'Descarbonizante Automotivo para TBI e Bicos | Boost',
		seoDescription:
			'Descarbonizante Boost: limpa corpo de borboleta (TBI), válvulas de admissão e bicos injetores. Para motores a álcool, gasolina, diesel e flex. Caixa com 24 latas.',
		image: '/imgs/boost_descarbonizante.webp',
		desc: 'O Descarbonizante Boost é um limpador de alta performance para o corpo do acelerador, válvula de admissão e bicos injetores. Sua fórmula foi desenvolvida para motores a álcool, gasolina, diesel e flex, removendo depósitos de carbono e garantindo um desempenho superior do motor. Além de proteger e lubrificar a válvula borboleta, é seguro para sensores de oxigênio e conversores catalíticos. Recomenda-se o uso a cada 3 meses ou 5.000 km para manter o sistema sempre limpo e eficiente.',
		specs: specsLata,
		blogSlug: 'descarbonizante-automotivo-limpeza-profunda-para-mais-desempenho-e-economia'
	}
];

export function getProduct(slug: string): Product | undefined {
	return products.find((p) => p.slug === slug);
}
