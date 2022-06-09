const conexao = require('../conexao.js')

const listarAutores = async (req, res) => {
    try{
        const autores = await conexao.query('SELECT * FROM autores');
        res.json(autores);
    } catch(error){
        res.status(400).json(error)
    }
}
const obterAutor = async (req, res) => {}
const cadastrarAutor = async (req, res) => {}
const atualizarAutor = async (req, res) => {}
const excluirAutor = async (req, res) => {}

module.exports = {
    listarAutores,
    obterAutor,
    cadastrarAutor,
    atualizarAutor,
    excluirAutor
}