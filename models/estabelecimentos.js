var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstabelecimentosSchema = new Schema({
    nome: String,
    email: String,
    senha: String,
    tipoComida: String,
    endereco: String,
    estado: String,
    cidade: String,
    bairro: String
});

module.exports = mongoose.model('Estabelecimentos', EstabelecimentosSchema);