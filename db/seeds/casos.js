/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // Limpar casos existentes
    await knex('casos').del();
    
    // Buscar os IDs dos agentes existentes
    const agentes = await knex('agentes').select('id').orderBy('id');
    
    if (agentes.length >= 3) {
        // Inserir casos usando os IDs reais dos agentes
        await knex('casos').insert([
            {
                titulo: 'homicidio',
                descricao: 'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.',
                status: 'aberto',
                agente_id: agentes[0].id  // Primeiro agente
            },
            {
                titulo: 'roubo', 
                descricao: 'Assalto a mão armada em estabelecimento comercial na Rua das Flores, 123. Suspeito fugiu com dinheiro do caixa.',
                status: 'solucionado',
                agente_id: agentes[1].id  // Segundo agente
            },
            {
                titulo: 'furto',
                descricao: 'Furto de veículo registrado no estacionamento do shopping center. Proprietário relatou desaparecimento do carro.',
                status: 'aberto',
                agente_id: agentes[2].id  // Terceiro agente
            }
        ]);
    }
};
