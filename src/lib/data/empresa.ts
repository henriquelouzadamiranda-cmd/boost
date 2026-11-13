// ============================================================
// DADOS DA EMPRESA — altere aqui e o site inteiro se atualiza
// ============================================================

export const empresa = {
	nome: 'Boost Auto Brasil',
	cidade: 'Belo Horizonte – MG',
	whatsapp: '5531998804464', // só números, com 55 + DDD
	whatsappExibicao: '(31) 99880-4464',
	email: 'vendasml@drltrade.com.br',
	instagram: 'https://www.instagram.com/boost_brasil',
	instagramUsuario: '@boost_brasil',
	/** Loja no Mercado Livre (usada quando o produto não tem link próprio) */
	mercadoLivreLoja: 'https://www.mercadolivre.com.br/loja/vf-parts',
	/** Deixe vazio ('') para não mostrar no rodapé */
	cnpj: '',
	endereco: ''
};

/** Monta o link do WhatsApp já com a mensagem escrita */
export function linkWhatsapp(mensagem?: string): string {
	const base = `https://api.whatsapp.com/send?phone=${empresa.whatsapp}`;
	return mensagem ? `${base}&text=${encodeURIComponent(mensagem)}` : base;
}

// ============================================================
// CONDIÇÕES PARA REVENDA — mostradas na página /seja-revendedor
// Edite os textos conforme as suas condições reais.
// ============================================================
export const condicoesRevenda = [
	{
		titulo: 'Venda em caixa fechada',
		texto: 'Os produtos são vendidos em caixas fechadas (24 latas ou 144 tubos), prontas para o seu estoque.'
	},
	{
		titulo: 'Direto do importador',
		texto: 'Você compra direto da Boost, sem intermediários, com preço de revenda.'
	},
	{
		titulo: 'Atendimento direto',
		texto: 'Pedido, dúvidas e suporte pelo WhatsApp, com quem conhece os produtos.'
	},
	{
		titulo: 'Material de venda',
		texto: 'Catálogo em PDF e informações técnicas para ajudar você a vender.'
	}
];
