var http = require('http');
var app = require('./config/express')();
require('./config/database')('mongodb://localhost/market-mean');

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express listening on: localhost:' + app.get('port'));
});