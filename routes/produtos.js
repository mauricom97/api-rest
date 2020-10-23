const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PRODUTOS COM GET

router.get('/', (req, res, next) => {
 mysql.getConnection((error, conn) => {
    if (error) { console.error(error); res.status(500).send({ error: error }) }
    conn.query(
        'SELECT * FROM produtos;',
        (error, result, fields) => {
            if (error) { console.error(error); res.status(500).send({ error: error }) }
            const response = {
                quantidade: result.length,
                produtos: result.map(prod => {
                    return {
                        id_produto: prod.id_produto,
                        nome: prod.nome,
                        preco: prod.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: `http://localhost:3000/produtos`
                        }

                    }
                })
                
            }
            return res.status(200).send({response: response})
        }
    )
});

});




//CRIA UM PRODUTO
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release();
                if (error) { console.error(error); res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_Produto: resultado.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo:  'POST',
                            descricao: 'Insere produto',
                            url: `http://localhost:3000/produtos`
                        }
                    }
                }
                
                res.status(201).send(response);
            }
        )
    })


});


//RETORNA UM PRODUTO POR ID
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, result, fields) => {
                if (error) { console.error(error); res.status(500).send({ error: error }) }

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: "Não foi possivel encontrar produto com esse ID"
                    });
                }

                const response = {
                        produto: {
                            id_produto: result[0].id_produto,
                            nome: result[0].nome,
                            preco: result[0].preco,
                            request: {
                                tipo:  'GET',
                                descricao: 'Listando produtos por ID',
                                url: `http://localhost:3000/produtos`
                        }
                    }
                }
                return res.status(200).send({response: response})
            }
        )
    });
})

// USANDO PATCH
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE produtos
                SET nome = ?,
                    preco = ?
                    WHERE id_produto = ?`,
            [
             req.body.nome,
             req.body.preco,
             req.body.id_produto
            ],
            (error, result, field) => {
                conn.release();
                if (error) { console.error(error); res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoCriado: {
                        id_Produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo:  'PATH',
                            descricao: 'Listando produtos por ID',
                            url: `http://localhost:3000/produtos/${req.body.id_produto}`
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    })
});

//USANDO DELETE 
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`, [req.body.id_produtos],
            (error, result, field) => {
                conn.release();
                if (error) { console.error(error); res.status(500).send({ error: error }) }
                const response = {
                    mensagem: "Produto removido com sucesso",
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: 'http://localhost:3000/produtos',
                        body: {
                            nome: 'String',
                            preco: 'Number'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
});
module.exports = router;