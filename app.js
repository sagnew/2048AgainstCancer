var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express();
app.use(express.static(path.join(__dirname, '2048')));

app.get('/', function(req, res){
    res.redirect("https://api.venmo.com/v1/oauth/authorize?client_id=1675&scope=make_payments%20access_profile");
});

app.get('/authorized', function(req, res){
    accessToken = req.query.access_token;
    res.send("Access token: " + accessToken);
});
app.get('/2048', function(req, res){
    console.log('end point reached');
    res.sendfile(__dirname + "/2048/index.html");
});
app.listen(1337);
console.log('Listening on port 1337');
