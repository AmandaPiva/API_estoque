const express = require("express");
const usuarioController = require("../controllers/usuario-controller");
const router = express.Router();

router.get('/', async function(req, res, next){
    try{
        res.json(await usuarioController.get(req.query.page));
    }catch(err){
        console.error("Erro ai selecionar os usuários", err.message);
        next(err);
    }
});

router.post('/', async function(req, res, next){
    try{
        res.json(await usuarioController.create(req.body));
    }catch(err){
        console.error("Erro ao criar um usuário", err.message);
        next(err);
    }
});

router.put('/:id', async function(req, res, next){
    try{
        res.json(await usuarioController.update(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao atualizar um uduário", err.message);
        next(err);
    }
})

router.delete('/:id', async function(req, res, next){
    try{
        res.json(await usuarioController.remove(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao remover um usuário");
        next(err);
    }
})

module.exports = router;