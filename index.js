const express = require('express');
const produtoRouter = require('./modules/entity-produto/routes/produto-router');
const localizacaoRouter = require('./modules/entity-localizacao/routes/localizacao-router');

const app = express();
const port = 4000;

// app.use(router);
app.use(express.json());
app.use(express.urlencoded ({extends: true, }));

app.get('/', (req, res) => {
    res.json({mensagem: "ok"});
});

app.use("/produto", produtoRouter);
app.use("/localizacao", localizacaoRouter);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

