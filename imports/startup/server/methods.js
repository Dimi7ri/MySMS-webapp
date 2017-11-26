Meteor.methods({
    sendSMS: function (number, message) {
      console.log("server side send sms");
      console.log(number);
      console.log(message);

      HTTP.call("POST", "https://api.transmitsms.com/send-sms.json", {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        auth: "61358f442c137c0de02d24a2d822991f:this1is4testing",
        content:'message='+message+'&to='+number+''
      }, function (error, result) {
        if (!error) {
          console.log(result)
        } else {
          if (result && result.statusCode === 400) {
            console.log(error)
            console.log(result)
            console.log(result.statusCode)
            return
          } else {
            console.log(error)
            console.log(result)
          }
        }
      });

    }
});
