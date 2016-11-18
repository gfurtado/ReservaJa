var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var Estabelecimentos = require('../models/estabelecimentos');

/* GET users listing. */
router.get('/', function (req, res) {
    mongoose.model('Estabelecimentos').find({}, function (err, estabelecimentos) {
        if (err) {
            return console.error(err);
        } else {

            res.format({
                //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                html: function () {
                    res.render('Estabelecimentos' + '/index', {
                        title: "Estabelecimentos",
                        "estabelecimentos": estabelecimentos
                    });
                },
                //JSON response will show all blobs in JSON format
                json: function () {
                    res.json(infophotos);
                }
            });
        }
    });
});

router.get('/novo', function (req, res) {
    res.render('Estabelecimentos' + '/novo');
});

router.post('/novo', function (req, res) {

    var estabelecimento = new Estabelecimentos();

    estabelecimento.nome = req.body.nome;
    estabelecimento.email = req.body.email;
    estabelecimento.senha = req.body.senha;
    estabelecimento.tipoComida = req.body.tipoComida;
    estabelecimento.estado = req.body.estado;
    estabelecimento.bairro = req.body.bairro;
    estabelecimento.cidade = req.body.cidade;

    estabelecimento.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'Estabelecimento ' + estabelecimento.nome + ' Criado!' });
    });

});


router.param('id', function (req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Estabelecimentos').findById(id, function (err, estabelecimento) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function () {
                    next(err);
                },
                json: function () {
                    res.json({ message: err.status + ' ' + err });
                }
            });
            //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(blob);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

module.exports = router;