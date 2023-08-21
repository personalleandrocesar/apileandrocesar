const express = require('express');
const app = express();
const mongoose = require('mongoose');

const usersModel = require('./models/user')


mongoose.connect('mongodb+srv://leandro:340209755@cluster0.rbzhjzh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => console.error('Erro de conexão com o MongoDB:', err));

const User = mongoose.model("User", usersModel)

const Leandro = new User({nome: "LeandroCesar",  senha: 1234 });

Leandro.save();
 






const porta = process.env.PORT || 3009;

app.listen(porta, () => {
    console.log(`Servidor Express rodando na porta ${porta}`);
});