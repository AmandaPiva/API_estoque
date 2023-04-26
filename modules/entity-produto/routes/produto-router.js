const express = require("express");
const produtoController = require("../controllers/produto-controller");
const router = express.Router();

router.get('/', async function(req, res, next){
    try{
        res.json(await produtoController.get(req.query.page));
    }catch(err){
        console.error('Erro ao selecionar os produtos', err.message);
        next(err)
    }
});

router.post('/', async function(req, res, next){
    try{
        res.json(await produtoController.create(req.body));
    }catch(err){
        console.error("Erro ao criar um produto", err.message);
        next(err);
    }
});

router.put('/:id', async function(req, res, next){
    try{
        res.json(await produtoController.update(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao atualizar um produto", err.message);
        next(err)
    }
})

router.delete('/:id', async function(req, res, next){
    try{
        res.json(await produtoController.remove(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao remover um produto", err.message);
        next(err)
    }
})



module.exports = router;