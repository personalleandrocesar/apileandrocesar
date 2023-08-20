const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb+srv://leandro:340209755@cluster0.rbzhjzh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        // Criar a coleção 'usuarios' explicitamente
        mongoose.connection.db.createCollection('usuarios', (err, res) => {
            if (err) throw err;
            console.log('Coleção de usuários criada');
        });
        console.log('Conectado ao MongoDB');
    })
    .catch(err => console.error('Erro de conexão com o MongoDB:', err));

// Configurar o middleware body-parser para lidar com dados JSON
app.use(bodyParser.json()); 

const porta = process.env.PORT || 3025;

app.listen(porta, () => {
    console.log(`Servidor Express rodando na porta ${porta}`);
});