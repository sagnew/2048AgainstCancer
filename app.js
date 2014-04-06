var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    request = require('request');

app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//Set up ejs for rendering
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
    console.log('req to home');
    res.redirect("https://api.venmo.com/v1/oauth/authorize?client_id=1675&scope=make_payments%20access_profile");
});

app.get('/game', function(req, res){
    var accessToken = req.query.access_token;
    console.log('end point reached');
    res.render(__dirname + "/views/index.html", {"accessToken": accessToken});
});
app.get('/pay', function (req, res){
    console.log(req.query); //recieving json, so far so good
    var url = "https://api.venmo.com/v1/payments";
    request({method:"POST", url: url, json: req.query}, function(err, resp, body){
        if (!err){
            res.send(body);
        }else{
            console.log("error");
        }
    });
}); 
app.listen(1337);
console.log('Listening on port 1337');
