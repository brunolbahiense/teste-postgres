const { query } = require('../conexao.js')

const listarAutores = async (req, res) => {
    try{
        const {rows: autores} = await query('SELECT * FROM autores');
        return res.json(autores);
    } catch(error){
        res.status(400).json(error.message)
    }
}
const obterAutor = async (req, res) => {
    const { id } = req.params
    try{
        const autor = await query('SELECT * FROM autores WHERE id = $1', [id]);
        if(autor.rowCount === 0) return res.status(404).json('Autor não encontrado')
        return res.json(autor.rows[0]);

    } catch(error){
        res.status(400).json(error.message)
    }
}
const cadastrarAutor = async (req, res) => {
    const {nome, idade} = req.body
    if(!nome) return res.status(400).json('O nome é obrigatório')

    try{
        const autor = await query('INSERT INTO autores (nome, idade) VALUES ($1, $2)', [nome, idade]) 
        if(autor.rowCount === 0) return res.status(404).json('Não foi possivel cadastrar o autor')
        return res.status(201).json('Autor cadastrado com sucesso')
    } catch(error){
        res.status(400).json(error.message)
    }
}
const atualizarAutor = async (req, res) => {
    const { id } = req.params
    const {nome, idade} = req.body
    if(!nome) return res.status(400).json('O nome é obrigatório')

    try{
        const autor = await query('SELECT * FROM autores WHERE id = $1', [id]);
        if(autor.rowCount === 0) return res.status(404).json('Autor não encontrado')
        
        const autorAtualizado = await query('UPDATE autores set nome = $1, idade = $2 WHERE id = $3', [nome, idade, id]);
        if(autorAtualizado.rowCount === 0) return res.status(404).json('Não foi possivel atualizar o autor')
        return res.status(200).json('Autor Atualizado');

    } catch(error){
        res.status(400).json(error.message)
    }
}
const excluirAutor = async (req, res) => {
    const { id } = req.params
    try{
        const autor = await query('SELECT * FROM autores WHERE id = $1', [id]);
        if(autor.rowCount === 0) return res.status(404).json('Autor não encontrado')

        const deletado = await query('DELETE FROM autores WHERE id = $1', [id]);
        if(deletado.rowCount === 0) return res.status(404).json('Não foi possivel excluir')

        return res.status(200).json('Autor excluido');

    } catch(error){
        res.status(400).json(error.message)
    }
}

module.exports = {
    listarAutores,
    obterAutor,
    cadastrarAutor,
    atualizarAutor,
    excluirAutor
}