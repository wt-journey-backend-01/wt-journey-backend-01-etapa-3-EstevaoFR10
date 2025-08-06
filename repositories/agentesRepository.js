const db = require('../db/db');

async function findAll() {
    return await db('agentes').select('*');
}

async function findById(id) {
    return await db('agentes').where({ id }).first();
}

async function create(dadosAgente) {
    const [novoAgente] = await db('agentes').insert(dadosAgente).returning('*');
    return novoAgente;
}

async function update(id, dadosAgente) {
    // Remover o campo 'id' dos dados a serem atualizados para proteger o ID
    const { id: _, ...dadosLimpos } = dadosAgente;
    
    const [agenteAtualizado] = await db('agentes')
        .where({ id })
        .update(dadosLimpos)
        .returning('*');
    return agenteAtualizado;
}

async function deleteById(id) {
    const agente = await findById(id);
    if (agente) {
        await db('agentes').where({ id }).del();
        return agente;
    }
    return null;
}

async function findByCargo(cargo) {
    return await db('agentes').where({ cargo }).select('*');
}

async function findAllSorted(sortBy) {
    if (sortBy === 'dataDeIncorporacao') {
        return await db('agentes').orderBy('dataDeIncorporacao', 'asc');
    }
    
    if (sortBy === '-dataDeIncorporacao') {
        return await db('agentes').orderBy('dataDeIncorporacao', 'desc');
    }
    
    return await db('agentes').select('*');
}

async function findByCargoSorted(cargo, sortBy) {
    let query = db('agentes').where('cargo', cargo);
    
    if (sortBy === 'dataDeIncorporacao') {
        query = query.orderBy('dataDeIncorporacao', 'asc');
    } else if (sortBy === '-dataDeIncorporacao') {
        query = query.orderBy('dataDeIncorporacao', 'desc');
    }
    
    return await query;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById,
    findByCargo,
    findAllSorted,
    findByCargoSorted
};
