const config = require("../../../shared/config");
const helper = require("../../../helper");
const db = require("../../../shared/db");

async function get(page=1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, cidade, uf, rua FROM localizacao LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return{
        data,
        meta
    }
}

async function create(localizacao){
    const insert = await db.query(
        `INSERT INTO localizacao (cidade, uf, rua) VALUES ('${localizacao.cidade}', '${localizacao.uf}', '${localizacao.rua}')`
    );

    let message = "Erro ao criar uma nova localização";

    if(insert.affectedRows){
        message = "Localização inserida com sucesso";
    }

    return {message};
}

async function update(id, localizacao){ //http://localhost:4000/localizacao/4
    const update = await db.query(
        `UPDATE localizacao SET cidade="${localizacao.cidade}", uf="${localizacao.uf}", rua="${localizacao.rua}" WHERE id=${id}`
    )

    let message = "Erro ao atualizar a localização";

    if(update.affectedRows){
        message = "localização alterada com sucesso";
    }

    return {message};
}

async function remove(id){
    const remove = await db.query(
        `DELETE FROM localizacao WHERE id=${id}`
    );

    let message = "Erro ao deletar uma localização";

    if(remove.affectedRows){
        message = "Localização removida com sucesso";
    }

    return {message};
}

module.exports ={
    get,
    create,
    update,
    remove
}