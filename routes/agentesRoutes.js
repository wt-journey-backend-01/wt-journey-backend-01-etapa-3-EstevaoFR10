const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

// Rota para listar todos os agentes (com suporte a query parameters)
router.get('/', agentesController.getAllAgentes);

// Rota para obter um agente específico
router.get('/:id', agentesController.getAgenteById);

// Rota para criar um novo agente
router.post('/', agentesController.createAgente);

// Rota para atualizar um agente completamente
router.put('/:id', agentesController.updateAgentePUT);

// Rota para atualizar um agente parcialmente
router.patch('/:id', agentesController.updateAgente);

// Rota para deletar um agente
router.delete('/:id', agentesController.deleteAgente);

module.exports = router;
