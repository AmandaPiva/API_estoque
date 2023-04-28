const config = require("../../../shared/config");
const helper = require("../../../helper");
const db = require("../../../shared/db");

async function get(page=1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, nome, email, senha FROM usuario LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return{
        data,
        meta
    }
}

async function create(usuario){
    const insert = await db.query(
        `INSERT INTO usuario (nome, email, senha) VALUES ("${usuario.nome}", "${usuario.email}", "${usuario.senha}")`
    );

    let message = "Erro ao criar um novo usuário";

    if(insert.affectedRows){
        message = "Usuário inserido com sucesso";
    }

    return {message};
}

async function update(id, usuario){
    const update = await db.query(
        `UPDATE usuario SET nome="${usuario.nome}", email= "${usuario.email}", senha="${usuario.senha}" WHERE id=${id}`
    );

    let message = "Erro ao atualizar um usuário";

    if(update.affectedRows){
        message = "Usuário atualizado com sucesso";
    }

    return {message};
}

async function remove(id){
    const remove = await db.query(
        `DELETE FROM usuario WHERE id=${id}`
    );

    let message = "Erro ao deletar um usuário";

    if(remove.affectedRows){
        message = "Usuário removido com sucesso";
    }

    return {message};
}

module.exports ={
    get,
    create,
    update,
    remove
}