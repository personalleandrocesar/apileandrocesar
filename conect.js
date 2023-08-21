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

// Definir o modelo de usuário (schema)
const UsuarioSchema = new mongoose.Schema({
    nome: String,
    senha: String,
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Rota para criar um novo usuário
app.post('/api/criar-usuario', async (req, res) => {
    try {
        const { nome, senha } = req.body;

        // Verificar se a coleção 'usuarios' já existe
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === 'usuarios');

        if (!collectionExists) {
            // Se a coleção não existir, crie-a
            mongoose.connection.db.createCollection('usuarios', (err, res) => {
                if (err) throw err;
                console.log('Coleção de usuários criada'); 
            });
        }

        // Criar uma instância do modelo Usuario com os dados recebidos
        const novoUsuario = new Usuario({ nome, senha });

        // Realizar a inserção dos dados na coleção 'usuarios'
        const usuarioInserido = await novoUsuario.save();

        // Responder com os dados do usuário inserido
        res.json(usuarioInserido);
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
});






const porta = process.env.PORT || 8080;

app.listen(porta, () => {
    console.log(`Servidor Express rodando na porta ${porta}`);
});