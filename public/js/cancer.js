//The amount of pennies to be donated
var paymentAmount = 0;

var incrementDonation = function(amount){
    if(paymentAmount !== -1){
        paymentAmount += amount;
    }
};

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var getAccessToken = function(){
    $.ajax({
        type: "GET",
        url: "/access",
        data: "",
        success: function(data){
            accessToken = data + "";
            makePayment(paymentAmount);
        }
    });
};

var makePayment = function(payment){
    $.ajax({
        type: "POST",
        url: "/pay",
        data: {
            amount: payment/100,
            access_token: accessToken,
            phone: "9084202938",
            note: "Donation ID: " + makeid()
        },
        success: function(response){
            console.log(response);
        },
    });
    paymentAmount = -1;
};
