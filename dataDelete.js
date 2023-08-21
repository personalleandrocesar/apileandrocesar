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

User.findByIdAndDelete("64e28e9830b59b0914edc2a9").then(users => {
    console.log("Removido com sucesso");
}).catch(err => {
    console.log(err);
})
  



const porta = process.env.PORT || 3015;

app.listen(porta, () => {
    console.log(`Servidor Express rodando na porta ${porta}`);
});