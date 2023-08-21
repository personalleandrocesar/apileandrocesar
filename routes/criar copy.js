const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Rota para adicionar um usuário
router.post('/adicionar', async (req, res) => {
    try {
        // Extrair os dados do usuário do corpo da solicitação
        const { nome, email } = req.body;

        // Criar uma instância do modelo Usuario com os dados recebidos
        const novoUsuario = new Usuario({ nome, senha });

        // Salvar o usuário no MongoDB
        await novoUsuario.save();

        // Responder com os dados do usuário adicionado
        res.json(novoUsuario);
    } catch (error) {
        // Lidar com erros
        console.error('Erro ao adicionar o usuário:', error);
        res.status(500).json({ error: 'Erro ao adicionar o usuário' });
    }
});

module.exports = router;
