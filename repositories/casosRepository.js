const db = require('../db/db');

async function findAll() {
    return await db('casos')
        .select('casos.*', 'agentes.nome as agente_nome')
        .leftJoin('agentes', 'casos.agente_id', 'agentes.id');
}

async function findById(id) {
    return await db('casos')
        .select('casos.*', 'agentes.nome as agente_nome')
        .leftJoin('agentes', 'casos.agente_id', 'agentes.id')
        .where('casos.id', id)
        .first();
}

async function create(dadosCaso) {
    const [novoCaso] = await db('casos').insert(dadosCaso).returning('*');
    return novoCaso;
}

async function update(id, dadosCaso) {
    // Remover o campo 'id' dos dados a serem atualizados para proteger o ID
    const { id: _, ...dadosLimpos } = dadosCaso;
    
    const [casoAtualizado] = await db('casos')
        .where({ id })
        .update(dadosLimpos)
        .returning('*');
    return casoAtualizado;
}

async function deleteById(id) {
    const caso = await db('casos').where({ id }).first();
    if (caso) {
        await db('casos').where({ id }).del();
        return caso;
    }
    return null;
}

async function findByAgenteId(agente_id) {
    return await db('casos')
        .select('casos.*', 'agentes.nome as agente_nome')
        .leftJoin('agentes', 'casos.agente_id', 'agentes.id')
        .where('casos.agente_id', agente_id);
}

async function findByStatus(status) {
    return await db('casos')
        .select('casos.*', 'agentes.nome as agente_nome')
        .leftJoin('agentes', 'casos.agente_id', 'agentes.id')
        .where('casos.status', status);
}

async function search(query) {
    const searchTerm = `%${query.toLowerCase()}%`;
    return await db('casos')
        .select('casos.*', 'agentes.nome as agente_nome')
        .leftJoin('agentes', 'casos.agente_id', 'agentes.id')
        .where(function() {
            this.whereRaw('LOWER(casos.titulo) LIKE ?', [searchTerm])
                .orWhereRaw('LOWER(casos.descricao) LIKE ?', [searchTerm]);
        });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById,
    findByAgenteId,
    findByStatus,
    search
};
