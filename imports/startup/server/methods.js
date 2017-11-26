Meteor.methods({
    sendSMS: function (number, message) {
      console.log("server side send sms");
      console.log(number);
      console.log(message);
    }
});
