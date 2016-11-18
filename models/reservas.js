var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservasSchema = new Schema({
    usuario: [{ type: Schema.Types.ObjectId, ref: 'Usuarios' }],
    estabelecimento: [{ type: Schema.Types.ObjectId, ref: 'Estabelecimentos' }],
    data: Date,
    pessoas: Number
});

module.exports = mongoose.model('Reservas', ReservasSchema);