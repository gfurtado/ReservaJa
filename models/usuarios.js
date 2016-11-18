var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsuariosSchema   = new Schema({
    nome: String ,
    email: String,
    senha: String,
    restaurante: Boolean,
    estado : String,
    cidade: String,
    bairro: String
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);