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

    var model = mongoose.model('Item', schema);
    console.log('Model: ' + model);
    return model;

};