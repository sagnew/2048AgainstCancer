var makePayment = function(payment){
    $.ajax({
        type: "POST",
        url: "/pay",
        data: {
            amount: payment,
            access_token: accessToken
        },
        success: function(response){
            console.log(response);
        },
    });
};
