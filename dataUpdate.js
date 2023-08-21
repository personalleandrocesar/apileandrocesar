
const mongoose = require('mongoose');

const usersModel = require('./models/user')


mongoose.connect('mongodb+srv://leandro:340209755@cluster0.rbzhjzh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => console.error('Erro de conexão com o MongoDB:', err));

const User = mongoose.model("User", usersModel)

User.findByIdAndUpdate("64e28a4153b5cfc84003374f", {nome: "leandrocesar"})
.then(users => {
    console.log("Atualizado com sucesso");
}).catch(err => {
    console.log(err);
})
  
