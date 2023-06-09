const config = require("../../../shared/config");
const helper = require("../../../helper");
const db = require("../../../shared/db");

async function get(page=1){ //http://localhost:4000/produto/?page=1 nossa URL 
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, nome, tipo, fornecedor, dataFabricacao, id_fabricante FROM produto LIMIT ${offset}, ${config.listPerPage}`
        );

    const data = helper.emptyOrRows(rows);
    const meta ={page};

    return{
        data,
        meta
    }
}

async function create(produto){
    const insert = await db.query(
        `INSERT INTO produto (nome, tipo, fornecedor, dataFabricacao, id_fabricante) VALUES ('${produto.nome}', '${produto.tipo}', '${produto.fornecedor}', '${produto.dataFabricacao}', '${produto.id_fabricante}')`
    );

    let message = "Erro ao criar um novo produto";

    if(insert.affectedRows){
        message = "Produto inserido com sucesso";
    }

    return {message};
}

async function update(id, produto){ //http://localhost:4000/produto/1 --> passando o id 1 como  parâmetro
    const update = await db.query(
        `UPDATE produto SET nome="${produto.nome}", tipo="${produto.tipo}", fornecedor="${produto.fornecedor}", dataFabricacao="${produto.dataFabricacao}", id_fabricante="${produto.id_fabricante}" WHERE id=${id}`
    )

    let message = "Erro ao atualizar um produto";

    if(update.affectedRows){
        message = "Produto alterado com sucesso";
    }

    return {message};
}

async function remove(id){
    const remove = await db.query(
        `DELETE FROM produto WHERE id=${id}`
    );

    let message = "Erro ao deletar um produto";

    if(remove.affectedRows){
        message = "Produto removido com sucesso";
    }

    return {message};
}

module.exports ={
    get,
    create,
    update,
    remove
}