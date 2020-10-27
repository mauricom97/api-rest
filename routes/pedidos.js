const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PEDIDOS COM GET
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos;',
            (error, result, fields) => {
                if (error) { console.error(error); res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    pedidos: result.map(pedido => {
                        return {
                            id_pedido : pedido.id_pedido,
                            id_produto: pedido.id_produto,
                            quantidade: pedido.quantidade,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os dados de um pedido especifico',
                                url: `http://localhost:3000/produtos/${pedido.id_pedido}`
                            }
    
                        }
                    })
                    
                }
                return res.status(200).send({response: response})
            }
        )
    });
});


//CRIA UM PEDIDO
router.post('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)',
            [req.body.id_produto, req.body.quantidade],
            (error, result, field) => {
                conn.release();
                if (error) { console.error(error); res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Pedido inserido com sucesso',
                    ProdutoCriado: {
                        id_produto: req.body.id_produto,
                        quantidade: req.body.quantidade,
                        request: {
                            tipo:  'GET',
                            descricao: 'Retorna todos os pedidos.',
                            url: `http://localhost:3000/pedidos`
                        }
                    }
                }
                
                res.status(201).send(response);
            }
        )
    })


});


//RETORNA UM PEDIDO POR ID
router.get('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedido = ?;',
            [req.params.id_pedido],
            (error, result, fields) => {
                if (error) { console.error(error); res.status(500).send({ error: error }) }

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: "Não foi possivel encontrar pedido com esse ID"
                    });
                }

                const response = {
                        pedido: {
                            id_pedido: result[0].id_pedido,
                            id_produto: result[0].id_produto,
                            quantidade: result[0].quantidade,
                            request: {
                                tipo:  'GET',
                                descricao: 'Listando produtos por ID',
                                url: `http://localhost:3000/pedidos`
                        }
                    }
                }
                return res.status(200).send({response: response})
            }
        )
    });
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