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
            table.string('cargo').notNullable(); // Cargo como STRING conforme README
        })
        .createTable('casos', function(table) {
            table.increments('id').primary(); // Auto-increment ID
            table.string('titulo').notNullable(); // Título do caso
            table.string('descricao').notNullable(); // Descrição do caso como STRING
            table.string('status').notNullable(); // Status como STRING
            table.integer('agente_id').unsigned().notNullable()
                .references('id').inTable('agentes'); // Foreign key obrigatória
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
