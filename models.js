var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/leaderboards');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

    var insertDonator = function(name, paymentAmount, venmoId) {
        var d = new Donator({"name": name,
            "totalDonated": paymentAmount,
            "venmoId": venmoId
        });

        d.save(function(err, donator) {
            if(err){
                console.log(err);
            }
        });
    };

    var contains = function(venmoId) {
        return Donator.find({"venmoId": venmoId}, function(err, result) {
            console.log(result);
            if(result){
                return true;
            }else{
                return false;
            }
        });
    };

    var updateDonator = function(venmoId, paymentAmount) {
        Donator.findOne({ "venmoId": venmoId }, function(err, donator){
            donator.totalDonated += paymentAmount;

            donator.save(function (err, donator) {
                if(err){
                    console.log(err);
                }
            });
        });
    };

    var donatorSchema = mongoose.Schema({
        name: String,
        totalDonated: Number,
        venmoId: Number
    });

    var metaSchema = mongoose.Schema({
        totalDonated: Number,
        numberOfDonations: Number
    });

    var Donator = mongoose.model('Donator', donatorSchema);
    var MetaInfo = mongoose.model('MetaInfo', metaSchema);

});
