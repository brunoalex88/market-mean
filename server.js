var http = require('http');
var app = require('./config/express')();
var DepLinker = require('dep-linker');
var uriMongo = process.env.MONGOLAB_URI || 'mongodb://localhost/market-mean';
//require('./config/database')('mongodb://localhost/market-mean');
require('./config/database')('mongodb://heroku_s9bqcv5m:4j2nuumpo8kelfuirseudmsf9m@ds045608.mlab.com:45608/heroku_s9bqcv5m');

DepLinker.copyDependenciesTo('./public/vendor')

http.createServer(app).listen(process.env.PORT || app.get('port'), function() {
    console.log('Express listening on: localhost:' + app.get('port'));
});