/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // Limpar dados existentes - ordem importante: primeiro casos, depois agentes
    await knex('casos').del();
    await knex('agentes').del();

    // Inserir agentes e capturar os IDs gerados
    const agentes = await knex('agentes').insert([
        {
            nome: 'Rommel Carneiro',
            dataDeIncorporacao: '1992-10-04',
            cargo: 'delegado'
        },
        {
            nome: 'Ana Silva',
            dataDeIncorporacao: '2010-03-15',
            cargo: 'inspetor'
        },
        {
            nome: 'Carlos Santos',
            dataDeIncorporacao: '2008-07-22',
            cargo: 'inspetor'
        }
    ]).returning('*');

    // Inserir casos usando os IDs reais dos agentes
    await knex('casos').insert([
        {
            titulo: 'homicidio',
            descricao: 'Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.',
            status: 'aberto',
            agente_id: agentes[0].id  // Rommel Carneiro
        },
        {
            titulo: 'roubo', 
            descricao: 'Assalto a mão armada em estabelecimento comercial na Rua das Flores, 123. Suspeito fugiu com dinheiro do caixa.',
            status: 'solucionado',
            agente_id: agentes[1].id  // Ana Silva
        },
        {
            titulo: 'furto',
            descricao: 'Furto de veículo registrado no estacionamento do shopping center. Proprietário relatou desaparecimento do carro.',
            status: 'aberto',
            agente_id: agentes[2].id  // Carlos Santos
        }
    ]);
};
