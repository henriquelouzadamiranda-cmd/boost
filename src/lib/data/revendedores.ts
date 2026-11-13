// ============================================================
// REVENDEDORES — aparecem no mapa da página /onde-comprar
//
// Para adicionar uma loja, copie o modelo abaixo para dentro da lista.
// lat/lng: abra o Google Maps, clique com o botão direito em cima da loja
// e clique nos números que aparecem (ex.: -19.9191, -43.9386) para copiar.
// ============================================================
//
// MODELO:
// {
// 	nome: 'Auto Peças Exemplo',
// 	endereco: 'Rua Exemplo, 123 - Centro',
// 	cidade: 'Belo Horizonte',
// 	uf: 'MG',
// 	telefone: '(31) 3333-3333', // opcional
// 	whatsapp: '5531999999999', // opcional, só números com 55 + DDD
// 	lat: -19.9191,
// 	lng: -43.9386
// },

export type Revendedor = {
	nome: string;
	endereco: string;
	cidade: string;
	uf: string;
	telefone?: string;
	whatsapp?: string;
	lat: number;
	lng: number;
};

export const revendedores: Revendedor[] = [
	// adicione as lojas aqui
];
