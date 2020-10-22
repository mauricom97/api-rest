const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PRODUTOS COM GET

router.get('/', (req, res, next) => {
//    res.status(200).send({
 //       mensagem: 'Usando o GET dentro da rota de produtos'
 //   });
 mysql.getConnection((error, conn) => {
    if (error) { console.error(error); res.status(500).send({ error: error }) }
    conn.query(
        'SELECT * FROM produtos;',
        (error, resultado, fields) => {
            if (error) { console.error(error); res.status(500).send({ error: error }) }
            return res.status(200).send({response: resultado})
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
            (error, resultado, field) => {
                conn.release();
                if (error) { console.error(error); res.status(500).send({ error: error }) }
                res.status(201).send({
                    mensagem: 'Produto insrido com sucesso',
                    id_produto: resultado.insertId
            });
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
            (error, resultado, fields) => {
                if (error) { console.error(error); res.status(500).send({ error: error }) }
                return res.status(200).send({response: resultado})
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
            (error, resultado, field) => {
                conn.release();
                if (error) { console.error(error); res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso.',
                    id_produto: resultado.insertId
            });
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
            (error, resultado, field) => {
                conn.release();
                if (error) { console.error(error); res.status(500).send({ error: error }) }
                res.status(202).send({
                    mensagem: 'Produto removido com sucesso.',
                    id_produto: resultado.insertId
            });
            }
        )
    })
});
module.exports = router;