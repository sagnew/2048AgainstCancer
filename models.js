function Models(){

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/leaderboards');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    var upsertDonator = function(name, paymentAmount, venmoId) {
        Donator.findOne({"venmoId": venmoId}, function(err, donator) {
            if(donator){
                donator.totalDonated += paymentAmount;
                donator.numberOfDonations += 1;

                donator.save(function (err, donator) {
                    if(err){
                        console.log(err);
                    }
                });
            }else{
                var d = new Donator({"name": name,
                    "totalDonated": paymentAmount,
                    "venmoId": venmoId,
                    "numberOfDonations": 1
                });

                d.save(function(err, donator) {
                    if(err){
                        console.log(err);
                    }
                });
            }
            return;
        });
    };

    var donatorSchema = mongoose.Schema({
        name: String,
        totalDonated: Number,
        venmoId: Number,
        numberOfDonations: Number
    });

    var Donator = mongoose.model('Donator', donatorSchema);

    return {
        "Donator": Donator,
        "upsertDonator": upsertDonator
    };

}

module.exports = Models;
