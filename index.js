const express = require('express');
const produtoRouter = require('./routes/produto-router');

const app = express();
const port = 4000;

// app.use(router);
app.use(express.json());
app.use(express.urlencoded ({extends: true, }));

app.get('/', (req, res) => {
    res.json({mensagem: "ok"});
});

app.use("/produto", produtoRouter);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

