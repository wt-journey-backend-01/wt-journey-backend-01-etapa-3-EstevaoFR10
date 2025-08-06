/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // Limpar dados existentes - ordem importante: primeiro casos, depois agentes
    await knex('casos').del();
    await knex('agentes').del();

    // Inserir apenas agentes
    await knex('agentes').insert([
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
    ]);
};
