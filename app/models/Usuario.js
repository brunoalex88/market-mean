var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {

    var schema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        name: {
            type: String,
            required: true
        },
        dataCadastro: {
            type: Date,
            default: Date.now
        }
    });

    schema.plugin(findOrCreate);
    return mongoose.model('Usuario', schema);

};