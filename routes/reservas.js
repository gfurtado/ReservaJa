var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var Reservas = require('../models/reservas');

/* GET users listing. */
router.get('/', function (req, res) {
    mongoose.model('Estabelecimentos').find({}, function (err, estabelecimentos) {
        if (err) {
            return console.error(err);
        } else {

            res.format({
                //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                html: function () {
                    res.render('Reservas' + '/index', {
                        title: "Reservas",
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


module.exports = router;