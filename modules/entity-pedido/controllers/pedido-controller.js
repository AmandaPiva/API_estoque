const config = require("../../../shared/config");
const helper = require("../../../helper");
const db = require("../../../shared/db");

async function get(page=1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, numPedido, dataPedido, dataEntrega, statusPedido FROM pedido LIMIT ${offset}, ${config.listPerPage}`
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return{
        data,
        meta
    }
}

async function create(pedido){
    const insert = await db.query(
        `INSERT INTO pedido (numPedido, dataPedido, dataEntrega, statusPedido) VALUES ("${pedido.numPedido}", "${pedido.dataPedido}", "${pedido.dataEntrega}", "${pedido.statusPedido}")`
    );

    let message = "Erro ao criar um novo pedido";

    if(insert.affectedRows){
        message = "Pedido inserido com sucesso";
    }

    return {message};
}

async function update(id, pedido){
    const update = await db.query(
        `UPDATE pedido SET numPedido="${pedido.numPedido}", dataPedido="${pedido.dataPedido}", dataEntrega="${pedido.dataEntrega}", statusPedido="${pedido.statusPedido}" WHERE id=${id}`
    );

    let message = "Erro ao atualizar um pedido";

    if(update.affectedRows){
        message = "Pedido atualizado com sucesso";
    }

    return {message};

}

async function remove(id){
    const remove = await db.query(
        `DELETE FROM pedido WHERE id=${id}`
    );

    let message = "Erro ao deletar um pedido";

    if(remove.affectedRows){
        message = "Pedido removido com sucesso";
    }

    return {message};
}

module.exports ={
    get,
    create,
    update,
    remove
}