const { query } = require('../conexao.js')

const listarlivros = async (req, res) => {
    try{
        const {rows: livros} = await query('SELECT * FROM livros');
        return res.json(livros);
    } catch(error){
        res.status(400).json(error.message)
    }
}
const obterlivro = async (req, res) => {
    const { id } = req.params
    try{
        const livro = await query('SELECT * FROM livros WHERE id = $1', [id]);
        if(livro.rowCount === 0) return res.status(404).json('livro não encontrado')
        return res.json(livro.rows[0]);

    } catch(error){
        res.status(400).json(error.message)
    }
}
const cadastrarlivro = async (req, res) => {
    const {autor_id, nome, genero, editora, data_publicacao} = req.body
    if(!nome) return res.status(400).json('O nome é obrigatório')

    try{
        const sql = `INSERT INTO livros 
        (autor_id, nome, genero, editora, data_publicacao) 
        VALUES ($1, $2, $3, $4, $5)`
        const livroCadastraado = await query(sql, [autor_id, nome, genero, editora, data_publicacao]) 
        if(livroCadastraado.rowCount === 0) return res.status(404).json('Não foi possivel cadastrar o livro!')
        return res.status(201).json('Livro cadastrado com sucesso')
    } catch(error){
        res.status(400).json(error.message)
    }
}
const atualizarlivro = async (req, res) => {
    const {id} = req.params
    const {autor_id, nome, genero, editora, data_publicacao} = req.body
    try{
        const livroCadastrado = await query('SELECT * FROM livros WHERE id = $1', [id]) 
        if(livroCadastrado.rowCount === 0) return res.status(404).json('Livro não encontrado!')

        const sql = `
        UPDATE livros SET
        autor_id = $1,
        nome = $2,
        genero = $3, 
        editora = $4, 
        data_publicacao = $5
        WHERE id = $6
        `
        const livroAtualizado = await query(sql, [autor_id, nome, genero, editora, data_publicacao, id]);
        if(livroAtualizado.rowCount === 0) return res.status(404).json('Não foi possivel atualizar o livro!')
        return res.status(201).json('Livro atualizado com sucesso')

    } catch(error){
        res.status(400).json(error.message)
    }
}
const excluirlivro = async (req, res) => {
    const { id } = req.params
    try{
        const livro = await query('SELECT * FROM livros WHERE id = $1', [id]);
        if(livro.rowCount === 0) return res.status(404).json('livro não encontrado')

        const deletado = await query('DELETE FROM livros WHERE id = $1', [id]);
        if(deletado.rowCount === 0) return res.status(404).json('Não foi possivel excluir')

        return res.status(200).json('livro excluido');
    } catch(error){
        res.status(400).json(error.message)
    }
}

module.exports = {
    listarlivros,
    obterlivro,
    cadastrarlivro,
    atualizarlivro,
    excluirlivro
}