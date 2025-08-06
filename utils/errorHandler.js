// Middleware para tratamento de erros
function errorHandler(err, req, res, next) {
    console.error('Erro capturado:', err);

    // Erro de validação
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Erro de validação',
            errors: err.errors
        });
    }

    // Erro de recurso não encontrado
    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            message: 'Recurso não encontrado',
            error: err.message
        });
    }

    // Erro interno do servidor
    res.status(500).json({
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
    });
}

// Middleware para tratar rotas não encontradas
function notFoundHandler(req, res) {
    res.status(404).json({
        message: 'Rota não encontrada',
        path: req.originalUrl,
        method: req.method
    });
}

module.exports = {
    errorHandler,
    notFoundHandler
};
