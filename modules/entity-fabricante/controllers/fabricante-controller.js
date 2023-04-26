const config = require("../../../shared/config");
const helper = require("../../../helper");
const db = require("../../../shared/db");

async function get(page=1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id_fabricante, nome, email, telefone FROM fabricante LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return{
        data,
        meta
    }
}

async function create(fabricante){
    const insert = await db.query(
        `INSERT INTO fabricante (nome, email, telefone) VALUES ('${fabricante.nome}', '${fabricante.email}', '${fabricante.telefone}')`
    );

    let message = "Erro ao criar um novo produto";

    if(insert.affectedRows){
        message = "Produto inserido com sucesso";
    }

    return {message};
}

async function update(id_fabricante, fabricante){
    const update = await db.query(
        `UPDATE fabricante SET nome="${fabricante.nome}", email="${fabricante.email}", telefone="${fabricante.telefone}" WHERE id_fabricante=${id_fabricante}`
    )

    let message = "Erro ao atualizar um fabricante";

    if(update.affectedRows){
        message = "Fabricante alterado com sucesso";
    }

    return {message};
}

module.exports={
    get,
    create,
    update
    // remove
}