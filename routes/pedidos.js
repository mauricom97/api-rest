const express = require('express');
const router = express.Router();


//RETORNA TODOS OS PEDIDOS COM GET
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os pedidos'
    });
});


//CRIA UM PEDIDO
router.post('/', (req, res, next) => {
    
    const pedido = {
        idProduto: req.body.idProduto,
        quantidade: req.body.quantidade
    }

        res.status(201).send({
        mensagem: 'Cria um pedido',
        pedido: pedido
    });
});


//RETORNA UM PEDIDO POR ID
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

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto alterado'
    });
});



//USANDO DELETE 
router.delete('/', (req, res, next) => {
        res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota de pedidos'
    });
});


module.exports = router;