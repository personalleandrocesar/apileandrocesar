const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: String,
    senha: String,
    // Outros campos do usuário, se necessário
});

module.exports = userSchema; 