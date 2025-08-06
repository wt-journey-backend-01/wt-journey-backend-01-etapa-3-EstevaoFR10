const agentesRepository = require("../repositories/agentesRepository");

async function getAllAgentes(req, res) {
    try {
        const { cargo, sort } = req.query;

        let agentes;

        if (cargo) {
            agentes = await agentesRepository.findByCargo(cargo);
        } else if (sort) {
            agentes = await agentesRepository.findAllSorted(sort);
        } else {
            agentes = await agentesRepository.findAll();
        }

        res.status(200).json(agentes);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

async function getAgenteById(req, res) {
    try {
        const { id } = req.params;
        const agente = await agentesRepository.findById(id);

        if (!agente) {
            return res.status(404).json({
                status: 404,
                message: 'Agente não encontrado'
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

async function createAgente(req, res) {
    try {
        const dadosAgente = req.body;

        // Validações básicas
        if (!dadosAgente.nome || !dadosAgente.dataDeIncorporacao || !dadosAgente.cargo) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    nome: !dadosAgente.nome ? "Campo 'nome' é obrigatório" : null,
                    dataDeIncorporacao: !dadosAgente.dataDeIncorporacao ? "Campo 'dataDeIncorporacao' é obrigatório" : null,
                    cargo: !dadosAgente.cargo ? "Campo 'cargo' é obrigatório" : null
                }
            });
        }

        // Validação de formato de data
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dadosAgente.dataDeIncorporacao)) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    dataDeIncorporacao: "Campo 'dataDeIncorporacao' deve estar no formato YYYY-MM-DD"
                }
            });
        }

        // Verificar se não é data futura
        const inputDate = new Date(dadosAgente.dataDeIncorporacao + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (inputDate > today) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    dataDeIncorporacao: "Campo 'dataDeIncorporacao' não pode ser uma data futura"
                }
            });
        }

        const novoAgente = await agentesRepository.create(dadosAgente);
        res.status(201).json(novoAgente);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

async function updateAgente(req, res) {
    try {
        const { id } = req.params;
        const dadosAgente = req.body;

        // Verificar se está tentando alterar o ID
        if (dadosAgente.id !== undefined) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors: {
                    id: "Campo 'id' não pode ser alterado"
                }
            });
        }

        // Validação extremamente rigorosa - qualquer formato incorreto = 400
        // Verificar se o body está vazio ou tem formato inválido
        if (!dadosAgente || typeof dadosAgente !== 'object' || Array.isArray(dadosAgente)) {
            return res.status(400).send();
        }

        // Verificar cada campo individualmente com validação extrema
        for (const [campo, valor] of Object.entries(dadosAgente)) {
            if (campo === 'id') continue; // ID já validado acima

            // Se não é um campo permitido
            if (!['nome', 'dataDeIncorporacao', 'cargo'].includes(campo)) {
                return res.status(400).send();
            }

            // Se o valor não é string, null ou undefined
            if (valor !== null && valor !== undefined && typeof valor !== 'string') {
                return res.status(400).send();
            }

            // Se é string vazia em campo obrigatório (para PUT)
            if (campo === 'nome' && valor === '') {
                return res.status(400).send();
            }
        }

        // Validação básica de formato de data se fornecida
        if (dadosAgente.dataDeIncorporacao) {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(dadosAgente.dataDeIncorporacao)) {
                return res.status(400).json({
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        dataDeIncorporacao: "Campo 'dataDeIncorporacao' deve estar no formato YYYY-MM-DD"
                    }
                });
            }

            // Verificar se não é data futura
            const inputDate = new Date(dadosAgente.dataDeIncorporacao + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (inputDate > today) {
                return res.status(400).json({
                    status: 400,
                    message: "Parâmetros inválidos",
                    errors: {
                        dataDeIncorporacao: "Campo 'dataDeIncorporacao' não pode ser uma data futura"
                    }
                });
            }
        }

        const agenteAtualizado = await agentesRepository.update(id, dadosAgente);

        if (!agenteAtualizado) {
            return res.status(404).json({
                status: 404,
                message: 'Agente não encontrado'
            });
        }

        res.status(200).json(agenteAtualizado);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Erro interno do servidor',
            error: error.message
        });
    }
}

async function deleteAgente(req, res) {
    try {
        const { id } = req.params;
        const agenteDeletado = await agentesRepository.deleteById(id);

        if (!agenteDeletado) {
            return res.status(404).json({
                status: 404,
                message: 'Agente não encontrado'
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
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    deleteAgente
};
