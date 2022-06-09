const express = require('express')
const {
    listarAutores,
    obterAutor,
    cadastrarAutor,
    atualizarAutor,
    excluirAutor
} = require('./controladores/autores')
const {
    listarlivros,
    obterlivro,
    cadastrarlivro,
    atualizarlivro,
    excluirlivro
} = require('./controladores/livros')
const rotas = express()

//autores
rotas.get('/autores', listarAutores)
rotas.get('/autores/:id', obterAutor)
rotas.post('/autores', cadastrarAutor)
rotas.put('/autores/:id', atualizarAutor)
rotas.delete('/autores/:id', excluirAutor)

//livros
rotas.get('/livros', listarlivros)
rotas.get('/livros/:id', obterlivro)
rotas.post('/livros', cadastrarlivro)
rotas.put('/livros/:id', atualizarlivro)
rotas.delete('/livros/:id', excluirlivro)


module.exports = rotas