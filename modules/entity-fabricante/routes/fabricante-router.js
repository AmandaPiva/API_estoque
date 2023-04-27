const express = require("express");
const fabricanteController = require("../../entity-fabricante/controllers/fabricante-controller");
const router = express.Router();

router.get('/', async function(req, res, next){
    try{
        res.json(await fabricanteController.get(req.query.page));
    }catch(err){
        console.error('Erro ao selecionar o fabricante', err.message);
        next(err)
    }
});

router.post('/', async function(req, res, next){
    try{
        res.json(await fabricanteController.create(req.body));
    }catch(err){
        console.error("Erro ao criar um fabricante", err.message);
        next(err);
    }
});

router.put('/:id_fabricante', async function(req, res, next){
    try{
        res.json(await fabricanteController.update(req.params.id_fabricante, req.body));
    }catch(err){
        console.error("Erro ao atualizar um fabricante", err.message);
        next(err)
    }
})

module.exports = router;