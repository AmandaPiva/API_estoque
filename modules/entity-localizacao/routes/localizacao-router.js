const express = require("express");
const localizacaoController = require("../../entity-localizacao/controllers/localizacao-controller");
const router = express.Router();

router.get('/', async function(req, res, next){
    try{
        res.json(await localizacaoController.get(req.query.page));
    }catch(err){
        console.error('Erro ao selecionar a localização', err.message);
        next(err)
    }
})

router.post('/', async function(req, res, next){
    try{
        res.json(await localizacaoController.create(req.body));
    }catch(err){
        console.error("Erro ao criar uma nova localização", err.message);
        next(err);
    }
});

router.put('/:id', async function(req, res, next){
    try{
        res.json(await localizacaoController.update(req.params.id, req.body))
    }catch(err){
        console.error("Erro ao atualizar a localização", err.message);
        next(err)
    }
})

router.delete('/:id', async function(req, res, next){
    try{
        res.json(await localizacaoController.remove(req.params.id, req.body));
    }catch(err){
        console.error("Erro ao remover uma localização", err.message); 
    }
})

module.exports = router;