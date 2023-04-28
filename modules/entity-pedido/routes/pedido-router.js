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

router.post('/', async function(req, res, next){
    try{
        res.json(await pedidoController.create(req.body));
    }catch(err){
        console.error("Erro ao selecionar os pedidos", err.message);
        next(err)
    }
});

router.put('/:id', async function(req, res, next){
    try{
        res.json(await pedidoController.update(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao atualizar o pedido", err.message)
        next(err)
    }
})

router.delete('/:id', async function(req, res, next){
    try{
        res.json(await pedidoController.remove(req.params.id, req.body))
    }catch(err){
        console.error("Erro ao remover um pedido", err.message);
        next(err)
    }
})

module.exports = router;