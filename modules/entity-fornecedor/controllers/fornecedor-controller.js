const config = require("../../../shared/config");
const helper = require("../../../helper");
const db = require("../../../shared/db");

async function get(page=1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, nome, endereco, telefone, email FROM fornecedor LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return{
        data,
        meta
    }
}

async function create(fornecedor){
    const insert = await db.query(
        `INSERT INTO fornecedor (nome, endereco, telefone, email) VALUES ('${fornecedor.nome}', '${fornecedor.endereco}', '${fornecedor.telefone}', '${fornecedor.email}')`
    );

    let message = "Erro ao criar um novo fornecedor";

    if(insert.affectedRows){
        message = "Fornecedor inserido com sucesso";
    }

    return {message};
}

async function update(id, fornecedor){
    const update = await db.query(
        `UPDATE fornecedor SET nome="${fornecedor.nome}", endereco="${fornecedor.endereco}", telefone="${fornecedor.telefone}", email="${fornecedor.email}" WHERE id=${id}`
    )

    let message = "Erro ao atualizar um fornecedor";

    if(update.affectedRows){
        message = "Fornecedor alterado com sucesso";
    }

    return {message};
}

async function remove(id){
    const remove = await db.query(
        `DELETE FROM fornecedor WHERE id=${id}`
    );

    let message = "Erro ao deletar um fornecedor";

    if(remove.affectedRows){
        message = "Fornecedor removido com sucesso";
    }

    return {message};
}

module.exports={
    get,
    create,
    update,
    remove
}