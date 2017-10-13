var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function() {
    var app = express();

    app.set('port', 3000);
    app.use(express.static('node_modules'));
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);
    
    return app;
};