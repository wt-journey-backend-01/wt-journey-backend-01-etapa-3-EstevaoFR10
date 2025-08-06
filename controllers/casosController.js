const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");

async function getAllCasos(req, res) {
    try {
        const { agente_id, status, q } = req.query;
        
        // Validar status se fornecido
        if (status && !['aberto', 'solucionado'].includes(status)) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
                }
            });
        }
        
        // Validar agente_id se fornecido (deve ser número positivo)
        if (agente_id) {
            const agenteIdNum = parseInt(agente_id);
            if (isNaN(agenteIdNum) || agenteIdNum <= 0) {
                return res.status(400).json({
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        agente_id: "O campo 'agente_id' deve ser um número inteiro positivo"
                    }
                });
            }
        }

        let casos;

        if (agente_id) {
            casos = await casosRepository.findByAgenteId(agente_id);
        } else if (status) {
            casos = await casosRepository.findByStatus(status);
        } else if (q) {
            casos = await casosRepository.search(q);
        } else {
            casos = await casosRepository.findAll();
        }

        res.status(200).json(casos);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

async function getCasoById(req, res) {
    try {
        const { id } = req.params;
        
        // Validar se o ID é um número válido
        const idNum = parseInt(id);
        if (isNaN(idNum) || idNum <= 0) {
            return res.status(400).json({
                status: 400,
                message: 'Parâmetros inválidos',
                errors: {
                    id: "ID deve ser um número inteiro positivo"
                }
            });
        }
        
        const caso = await casosRepository.findById(id);

        if (!caso) {
            return res.status(404).json({
                status: 404,
                message: 'Caso não encontrado'
            });
        }

        res.status(200).json(caso);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

async function getAgenteByCasoId(req, res) {
    try {
        const { caso_id } = req.params;
        
        // Validar se o ID é um número válido
        const idNum = parseInt(caso_id);
        if (isNaN(idNum) || idNum <= 0) {
            return res.status(400).json({
                status: 400,
                message: 'Parâmetros inválidos',
                errors: {
                    caso_id: "ID deve ser um número inteiro positivo"
                }
            });
        }
        
        const caso = await casosRepository.findById(caso_id);

        if (!caso) {
            return res.status(404).json({
                status: 404,
                message: 'Caso não encontrado'
            });
        }

        const agente = await agentesRepository.findById(caso.agente_id);

        if (!agente) {
            return res.status(404).json({
                status: 404,
                message: 'Agente responsável não encontrado'
            });
        }

        res.status(200).json(agente);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

async function createCaso(req, res) {
    try {
        const dadosCaso = req.body;

        // Validações básicas
        if (!dadosCaso.titulo || !dadosCaso.descricao || !dadosCaso.status || !dadosCaso.agente_id) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    titulo: !dadosCaso.titulo ? "Campo 'titulo' é obrigatório" : null,
                    descricao: !dadosCaso.descricao ? "Campo 'descricao' é obrigatório" : null,
                    status: !dadosCaso.status ? "Campo 'status' é obrigatório" : null,
                    agente_id: !dadosCaso.agente_id ? "Campo 'agente_id' é obrigatório" : null
                }
            });
        }

        // Validar agente_id (deve ser número válido)
        const agenteIdNum = parseInt(dadosCaso.agente_id);
        if (isNaN(agenteIdNum) || agenteIdNum <= 0) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    agente_id: "O campo 'agente_id' deve ser um número inteiro positivo"
                }
            });
        }

        // Validar status
        if (dadosCaso.status && !['aberto', 'solucionado'].includes(dadosCaso.status)) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
                }
            });
        }

        // Verificar se agente existe - retornar 404 se não existir
        const agente = await agentesRepository.findById(dadosCaso.agente_id);
        if (!agente) {
            return res.status(404).json({
                status: 404,
                message: "Agente não encontrado"
            });
        }
        
        const novoCaso = await casosRepository.create(dadosCaso);
        res.status(201).json(novoCaso);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}

async function updateCasoPUT(req, res) {
    try {
        const { id } = req.params;
        const dadosCaso = req.body;
        
        // Validar se o ID é um número válido
        const idNum = parseInt(id);
        if (isNaN(idNum) || idNum <= 0) {
            return res.status(400).json({
                status: 400,
                message: 'Parâmetros inválidos',
                errors: {
                    id: "ID deve ser um número inteiro positivo"
                }
            });
        }
        
        // Verificar se está tentando alterar o ID
        if (dadosCaso.id !== undefined) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    id: "Campo 'id' não pode ser alterado"
                }
            });
        }
        
        // PUT exige todos os campos obrigatórios
        if (!dadosCaso.titulo || !dadosCaso.descricao || !dadosCaso.status || !dadosCaso.agente_id) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    titulo: !dadosCaso.titulo ? "Campo 'titulo' é obrigatório" : null,
                    descricao: !dadosCaso.descricao ? "Campo 'descricao' é obrigatório" : null,
                    status: !dadosCaso.status ? "Campo 'status' é obrigatório" : null,
                    agente_id: !dadosCaso.agente_id ? "Campo 'agente_id' é obrigatório" : null
                }
            });
        }
        
        // Validar agente_id (deve ser número válido)
        const agenteIdNum = parseInt(dadosCaso.agente_id);
        if (isNaN(agenteIdNum) || agenteIdNum <= 0) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    agente_id: "O campo 'agente_id' deve ser um número inteiro positivo"
                }
            });
        }
        
        // Validar status
        if (!['aberto', 'solucionado'].includes(dadosCaso.status)) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
                }
            });
        }
        
        // Verificar se agente existe
        const agente = await agentesRepository.findById(dadosCaso.agente_id);
        if (!agente) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    agente_id: "Agente especificado não existe"
                }
            });
        }
        
        const casoAtualizado = await casosRepository.update(id, dadosCaso);
        
        if (!casoAtualizado) {
            return res.status(404).json({ 
                status: 404,
                message: 'Caso não encontrado'
            });
        }
        
        res.status(200).json(casoAtualizado);
    } catch (error) {
        res.status(500).json({ 
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message 
        });
    }
}async function updateCaso(req, res) {
    try {
        const { id } = req.params;
        const dadosCaso = req.body;

        // Validar se o ID é um número válido
        const idNum = parseInt(id);
        if (isNaN(idNum) || idNum <= 0) {
            return res.status(400).json({
                status: 400,
                message: 'Parâmetros inválidos',
                errors: {
                    id: "ID deve ser um número inteiro positivo"
                }
            });
        }

        // Verificar se está tentando alterar o ID
        if (dadosCaso.id !== undefined) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    id: "Campo 'id' não pode ser alterado"
                }
            });
        }

        // Validação extremamente rigorosa para payload inválido
        // Verificar se o body está vazio ou tem formato inválido
        if (!dadosCaso || typeof dadosCaso !== 'object' || Array.isArray(dadosCaso)) {
            return res.status(400).send();
        }

        // Verificar cada campo individualmente com validação extrema
        for (const [campo, valor] of Object.entries(dadosCaso)) {
            if (campo === 'id') continue; // ID já validado acima

            // Se não é um campo permitido
            if (!['titulo', 'descricao', 'status', 'agente_id'].includes(campo)) {
                return res.status(400).send();
            }

            // Se o valor não é string, null ou undefined (exceto agente_id que deve ser número)
            if (valor !== null && valor !== undefined) {
                if (campo === 'agente_id') {
                    // agente_id deve ser número ou string que representa número
                    if (typeof valor !== 'string' && typeof valor !== 'number') {
                        return res.status(400).send();
                    }
                    // Se é string, deve ser conversível para número
                    if (typeof valor === 'string' && isNaN(parseInt(valor))) {
                        return res.status(400).send();
                    }
                } else if (typeof valor !== 'string') {
                    return res.status(400).send();
                }
            }
        }

        // Validar status se fornecido
        if (dadosCaso.status && !['aberto', 'solucionado'].includes(dadosCaso.status)) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
                }
            });
        }

        // Verificar se agente existe se fornecido
        if (dadosCaso.agente_id) {
            // Validar se agente_id é um número válido
            const agenteIdNum = parseInt(dadosCaso.agente_id);
            if (isNaN(agenteIdNum) || agenteIdNum <= 0) {
                return res.status(400).json({
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        agente_id: "O campo 'agente_id' deve ser um número inteiro positivo"
                    }
                });
            }
            
            const agente = await agentesRepository.findById(dadosCaso.agente_id);
            if (!agente) {
                return res.status(400).json({
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        agente_id: "Agente especificado não existe"
                    }
                });
            }
        }

        const casoAtualizado = await casosRepository.update(id, dadosCaso);

        if (!casoAtualizado) {
            return res.status(404).json({
                status: 404,
                message: 'Caso não encontrado'
            });
        }

        res.status(200).json(casoAtualizado);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

async function deleteCaso(req, res) {
    try {
        const { id } = req.params;
        
        // Validar se o ID é um número válido
        const idNum = parseInt(id);
        if (isNaN(idNum) || idNum <= 0) {
            return res.status(400).json({
                status: 400,
                message: 'Parâmetros inválidos',
                errors: {
                    id: "ID deve ser um número inteiro positivo"
                }
            });
        }
        
        const casoDeletado = await casosRepository.deleteById(id);

        if (!casoDeletado) {
            return res.status(404).json({
                status: 404,
                message: 'Caso não encontrado'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

module.exports = {
    getAllCasos,
    getCasoById,
    getAgenteByCasoId,
    createCaso,
    updateCaso,
    updateCasoPUT,
    deleteCaso
};
