const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const usersModel = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://leandro:340209755@cluster0.rbzhjzh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch(err => console.error('Erro de conexão com o MongoDB:', err));

const User = mongoose.model("User", usersModel);

const finder = User.find({}).then(users => {
    console.log(users);
}).catch(err => {
    console.log(err);
})

// Defina uma rota para buscar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});

const porta = process.env.PORT || 3017;

app.listen(porta, () => {
    console.log(`Servidor Express rodando na porta ${porta}`);
});
