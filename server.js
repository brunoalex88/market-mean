var http = require('http');
var app = require('./config/express')();
var uriMongo = process.env.MONGOLAB_URI || 'mongodb://localhost/market-mean';
//require('./config/database')('mongodb://localhost/market-mean');
require('./config/database')(uriMongo);

http.createServer(app).listen(process.env.PORT || app.get('port'), function() {
    console.log('Express listening on: localhost:' + app.get('port'));
});