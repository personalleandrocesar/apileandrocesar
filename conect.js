const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Conectar ao banco de dados MySQL
const connection = mysql.createConnection({
    host: 'seu-host',
    user: 'seu-usuario',
    password: 'sua-senha',
    database: 'seu-banco-de-dados',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro de conexão com o MySQL:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// Configurar o middleware body-parser para lidar com dados JSON
app.use(bodyParser.json());

// Definir o modelo de usuário (schema)
const UsuarioSchema = {
    nome: String,
    senha: String,
};

// Rota para criar um novo usuário
app.post('/api/criar-usuario', (req, res) => {
    try {
        const { nome, senha } = req.body;

        // Criar uma instância do modelo Usuario com os dados recebidos
        const novoUsuario = { nome, senha };

        // Realizar a inserção dos dados na tabela 'usuarios'
        connection.query('INSERT INTO usuarios SET ?', novoUsuario, (error, results) => {
            if (error) {
                console.error('Erro ao criar o usuário:', error);
                res.status(500).json({ error: 'Erro ao criar o usuário' });
            } else {
                // Adicionar o ID gerado ao objeto novoUsuario
                novoUsuario.id = results.insertId;

                // Responder com os dados do usuário inserido
                res.json(novoUsuario);
            }
        });
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
});

const porta = process.env.PORT || 8080;

app.listen(porta, () => {
    console.log(`Servidor Express rodando na porta ${porta}`);
});