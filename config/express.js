var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var helmet = require('helmet');

module.exports = function() {
    var app = express();

    app.set('port', 3000);
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(require('method-override')());

    app.use(session({                  
        secret: 'market-mean',
        resave: true, 
        name: 'cookie_name',
        saveUninitialized: true }
        )
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(favicon());

    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.disable('x-powered-by');

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes/auth.js')
        .then('routes')
        .into(app);
    
    app.get('*', function(req, res) {
        res.redirect('/');
    });

    return app;
};