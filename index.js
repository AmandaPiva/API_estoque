const express = require('express');
const produtoRouter = require('./modules/entity-produto/routes/produto-router');
const localizacaoRouter = require('./modules/entity-localizacao/routes/localizacao-router');
const fabricanteRouter = require('./modules/entity-fabricante/routes/fabricante-router');
const fornecedorRouter = require('./modules/entity-fornecedor/routes/fornecedor-router');
const pedidoRouter = require('./modules/entity-pedido/routes/pedido-router');
const usuarioRouter = require('./modules/entity-usuario/routes/usuario-router')

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
app.use("/fabricante", fabricanteRouter);
app.use("/fornecedor", fornecedorRouter);
app.use("/pedido", pedidoRouter);
app.use("/usuario", usuarioRouter);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

