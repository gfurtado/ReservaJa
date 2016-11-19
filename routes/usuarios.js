var express = require('express');
var router = express.Router();
var fs = require('fs');
var  mongoose = require('mongoose');
var Usuarios = require('../models/usuarios');

/* GET users listing. */
router.get('/', function (req, res) {    
    mongoose.model('Usuarios').find({}, function (err, usuarios) {
        if (err) {
            return console.error(err);
        } else {
            
            res.format({
                html: function () {
                    res.render('Usuario' + '/index', {
                        title: "Usuarios", 
                        "usuarios": usuarios
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

router.route('/editar/:id')
    .get(function (req, res) {
        mongoose.model('Usuarios').findById(req.id, function (err, usuario) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + usuario._id);               
                res.format({
                    html: function () {
                        res.render('Usuario' + '/editar', {
                            "usuario": usuario
                        });
                    },
                    json: function () {
                        res.json(usuario);
                    }
                });
            }
        });
    });

/* GET users listing. */
router.get('/novo', function (req, res) {
    res.render('Usuario' + '/novo');
});

router.param('id', function (req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Usuarios').findById(id, function (err, usuario) {
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


router.post('/', function (req, res) {

    var usuario = new Usuarios();

    usuario.nome = req.body.nome;
    usuario.estado = req.body.estado;
    usuario.cidade = req.body.cidade;
    usuario.bairro = req.body.bairro;

    console.log(usuario);

    usuario.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'Usuario ' + usuario.nome + ' Criado!' });
    });

});


module.exports = router;
