// app.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bthtdb'); // connect to our database

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function(req, res, next) {
    // To do remove _id and __v from response
	//console.log(res);
    next();
});

require('./routes/index')(router);
require('./routes/tournament')(router);
require('./routes/match')(router);
require('./routes/user')(router);
require('./routes/game')(router);

app.use('/v1', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
