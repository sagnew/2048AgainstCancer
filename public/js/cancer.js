//The amount of pennies to be donated
var paymentAmount = 0;

var incrementDonation = function(amount){
    if(paymentAmount !== -1){
        paymentAmount += amount;
    }
};

var makePayment = function(payment){
    $.ajax({
        type: "POST",
        url: "/pay",
        data: {
            amount: payment/100,
            access_token: accessToken,
            email: "sagnew92@gmail.com",
            note: "2048 against cancer"
        },
        success: function(response){
            console.log(response);
        },
    });
    paymentAmount = -1;
};
