var express = require('express'),
    http = require('http'),
    path = require('path'),
    sys = require('sys'),
    exec = require('child_process').exec,
    app = express(),
    request = require('request');

app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

//Set up ejs for rendering
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

//Initialize accessToken globally for later use
var accessToken = "";

//Mimicing curl because Venmo sucks
var pay = function(accessToken, amount, note){
    var curlString = 'curl https://api.venmo.com/v1/payments -d access_token=' + accessToken + ' -d email="faiqrazarizvi@yahoo.com" -d amount=' + amount + ' -d note="' + note + '"';
    var child = exec(curlString, function(error, stdout, stderr){
        console.log(curlString);
        sys.print('stdout: ' + stdout);
        if(error !== null){
            console.log('Error: ' + error);
        }
    });
};

app.get('/', function(req, res){
    res.sendfile(__dirname + "/views/landingpage.html");
});

app.post('/auth', function(req, res){
    res.redirect("https://api.venmo.com/v1/oauth/authorize?client_id=1675&scope=make_payments%20access_profile");
});

app.get('/game', function(req, res){
    accessToken = req.query.access_token;
    res.render(__dirname + "/views/index.html", {"accessToken": accessToken});
});

app.post('/pay', function (req, res){
    var url = "https://api.venmo.com/v1/payments";
    var params = req.body;
    params.amount = parseFloat(params.amount);
    if(params.amount < 1 && params.amount > 0){
        params.amount = 1;
    }
    pay(params.access_token, params.amount, params.note);
});

app.get("/access", function(req, res){
    res.send(accessToken);
});

app.listen(1337);
console.log('Listening on port 1337');
