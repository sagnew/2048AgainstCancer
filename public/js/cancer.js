var makePayment = function(payment){
    $.ajax({
        type: "POST",
        url: "/pay",
        data: {
            amount: payment,
            access_token: accessToken,
            email: "sagnew92@gmail.com",
            note: "2048 against cancer"
        },
        success: function(response){
            console.log(response);
        },
    });
};
