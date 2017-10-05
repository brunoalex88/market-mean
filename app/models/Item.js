var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({
        descricao: {
            type: String,
            required: true
        },
        estoqueMinimo: {
            type: Number,
            required: true
        },
        estoqueAtual: {
            type: Number,
            required: true
        }
    });

    return mongoose.Model('Item', schema);

};