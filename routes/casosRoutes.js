const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

// Rota para listar todos os casos (com suporte a query parameters)
router.get('/', casosController.getAllCasos);

// Rota para obter um caso específico
router.get('/:id', casosController.getCasoById);

// Rota para obter o agente responsável por um caso
router.get('/:caso_id/agente', casosController.getAgenteByCasoId);

// Rota para criar um novo caso
router.post('/', casosController.createCaso);

// Rota para atualizar um caso completamente
router.put('/:id', casosController.updateCaso);

// Rota para atualizar um caso parcialmente
router.patch('/:id', casosController.updateCaso);

// Rota para deletar um caso
router.delete('/:id', casosController.deleteCaso);

module.exports = router;
