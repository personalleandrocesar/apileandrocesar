require('dotenv').config()
const express = require('express')
const app = express()
const fs = require("fs")
const port = 3002
const path = require("path")
const dirAtual = path.resolve('./legal')
const content = "Conteúdo do arquivo criado!!!!"

fs.readFile("/home/leandrocesar/Documents/le.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
}),


   cr = () => {

        fs.writeFile(dirAtual, content, (err) => {
            if (err) throw err
            console.log("leandros criado")
        })
    },



// fs.mkdir(dirAtual,(err) => {
//     if (err) throw err;
//     console.log("diretório criado com sucesso!");
// }),

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log('Página raiz');
})

app.get('/sobre', (req, res) => {
    res.send('Página sobre')
    console.log(cr());
    cr()
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
