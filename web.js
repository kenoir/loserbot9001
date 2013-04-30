var express = require("express");
var config = require("./config");

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.allowed_domains);
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use(express.logger());

app.get('/', function(request, response) {
    var configured_response = config.salutation;

    if(request.headers.accept == 'application/json'){ 
        response.setHeader('Content-Type', 'applcation/json');
        parsed_response = JSON.stringify(configured_response);
    } else {
        response.setHeader('Content-Type', 'text/plain');
        parsed_response = configured_response.content;
    }
    response.send(parsed_response);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
