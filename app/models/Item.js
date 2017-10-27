var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({
        descricao: {
            type: String,
            required: true
        },
        estoqueMinimo: {
            type: Number,
            required: true,
            default: 0
        },
        estoqueAtual: {
            type: Number,
            required: true,
            default: 0
        }
    });

    return mongoose.model('Item', schema);

};