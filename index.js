const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');

const usersModel = require('./models/user')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://leandro:340209755@cluster0.rbzhjzh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => console.error('Erro de conexão com o MongoDB:', err));

const User = mongoose.model("User", usersModel)

const finder = User.find({}).then(users => {
    console.log(users);
}).catch(err => {
    console.log(err);
})

app.get('/', (req,res)=>{
    res.json(finder);
})



const porta = process.env.PORT || 3016;

app.listen(porta, () => {
    console.log(`Servidor Express rodando na porta ${porta}`);
});