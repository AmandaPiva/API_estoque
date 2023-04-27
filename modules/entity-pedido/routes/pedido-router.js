const express = require("express");
const pedidoController = require("../controllers/pedido-controller");
const router = express.Router();

router.get('/', async function(req, res, next){
    try{
        res.json(await pedidoController.get(req.query.page));
    }catch(err){
        console.error("Erro ao selecionar um pedido", err.message);
        next(err);
    }
});

module.exports = router;