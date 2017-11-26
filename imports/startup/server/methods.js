Meteor.methods({
    sendSMS: function (number, message) {
      var auth = Meteor.settings.BurstSMS_API_Key+':'+Meteor.settings.BurstSMS_API_Secret;
      console.log("server side send sms");
      console.log(number);
      console.log(message);
      console.log(auth);

      HTTP.call("POST", "https://api.transmitsms.com/send-sms.json", {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        auth: auth,
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
