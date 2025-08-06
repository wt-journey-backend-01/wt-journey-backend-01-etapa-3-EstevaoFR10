/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('agentes', function(table) {
            table.increments('id').primary(); // Auto-increment ID
            table.string('nome').notNullable(); // Nome do agente
            table.date('dataDeIncorporacao').notNullable(); // Data de incorporação
            table.string('cargo', 100).notNullable(); // Cargo (delegado, inspetor, etc.)
        })
        .createTable('casos', function(table) {
            table.increments('id').primary(); // Auto-increment ID
            table.string('titulo', 255).notNullable(); // Título do caso
            table.text('descricao').notNullable(); // Descrição do caso
            table.enu('status', ['aberto', 'solucionado']).notNullable(); // Status
            table.integer('agente_id').unsigned().references('id').inTable('agentes'); // Referência ao agente responsável
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('casos') // Primeiro casos (tem FK)
        .dropTableIfExists('agentes'); // Depois agentes
};
