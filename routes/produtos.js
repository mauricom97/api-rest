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