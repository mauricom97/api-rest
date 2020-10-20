const express = require('express');
const router = express.Router();


//RETORNA TODOS OS PRODUTOS COM GET
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de produtos'
    });
})


//CRIA UM PRODUTO
router.post('/', (req, res, next) => {

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }

        res.status(201).send({
            mensagem: 'Usando o POST dentro da rota de produtos',
            produtoCriado: produto
    });
});


//RETORNA UM PRODUTO POR ID
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    if(id === 'especial'){
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: `Você passou um ID: ${id}`
        })
    }

    res.status(200).send({

    })
})

// USANDO PATCH
router.patch('/', (req, res, next) => {
        res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de produtos'
    });
});

//USANDO DELETE 
router.delete('/', (req, res, next) => {
        res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de produtos'
    });
});
module.exports = router;