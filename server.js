//mongodb://heroku_s9bqcv5m:4j2nuumpo8kelfuirseudmsf9m@ds045608.mlab.com:45608/heroku_s9bqcv5m
var http = require('http');
var app = require('./config/express')();
var uriMongo = process.env.MONGOLAB_URI || 'mongodb://localhost/market-mean';
//require('./config/database')('mongodb://localhost/market-mean');
require('./config/database')(uriMongo);
require('./config/passport')();

console.log('URI Mongo: ' + uriMongo);

http.createServer(app).listen(process.env.PORT || app.get('port'), function() {
    console.log('Express server listening');
});