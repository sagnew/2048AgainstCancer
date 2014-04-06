var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    console.log('req to home');
    res.redirect("https://api.venmo.com/v1/oauth/authorize?client_id=1675&scope=make_payments%20access_profile");
});

app.get('/game', function(req, res){
    var accessToken = req.query.access_token;
    console.log('end point reached');
    res.sendfile(__dirname + "/views/index.html");
});

app.listen(1337);
console.log('Listening on port 1337');
