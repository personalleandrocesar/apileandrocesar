const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: "leandro",
    senha: 1234,
    // Outros campos do usuário, se necessário
});

module.exports = mongoose.model('Usuario', usuarioSchema);
