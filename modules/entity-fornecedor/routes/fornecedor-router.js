const express = require("express");
const fornecedorController = require("../../entity-fornecedor/controllers/fornecedor-controller");
const router = express.Router();

router.get('/', async function(req, res, next){
    try{
        res.json(await fornecedorController.get.apply(req.query.page));
    }catch(err){
        console.error("Erro ao selecionar um forneceddor")
        next(err)
    }
});

router.post('/', async function(req, res, next){
    try{
        res.json(await fornecedorController.create(req.body));
    }catch(err){
        console.error("Erro ao criar um fornecedor", err.message);
        next(err);
    }
});

router.put('/:id', async function(req, res, next){
    try{
        res.json(await fornecedorController.update(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao atualizar um fornecedor", err.message);
        next(err)
    }
})

router.delete('/:id', async function(req, res, next){
    try{
        res.json(await fornecedorController.remove(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao remover um fornecedor", err.message);
        next(err)
    }
})

module.exports = router;