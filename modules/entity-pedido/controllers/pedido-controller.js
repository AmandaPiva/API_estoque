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
        `INSERT INTO pedido (numPedido, dataPedido, dataEntrega, statusPedido) VALUES ('${pedido.numPedido}', '${pedido.dataPedido}', '${pedido.dataEntrega}', '${pedido.statusPedido}')`
    );

    let message = "Erro ao criar um novo pedido";

    if(insert.affectedRows){
        message = "Pedido inserido com sucesso";
    }

    return {message};
}