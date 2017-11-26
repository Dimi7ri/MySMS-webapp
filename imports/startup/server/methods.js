import async from 'async';
import Future from 'fibers/future';

const Bitly     = require( 'bitly' ),
      bitly     = new Bitly( Meteor.settings.Bitly_Access_Token )
      linkify   = require('linkifyjs');

Meteor.methods({
    sendSMS: function (number, message) {
      var auth = Meteor.settings.BurstSMS_API_Key+':'+Meteor.settings.BurstSMS_API_Secret;

      var future = new Future();
      HTTP.call("POST", "https://api.transmitsms.com/send-sms.json", {
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          auth: auth,
          content:'message='+message+'&to='+number+''
        }, function (error, result) {
          if (!error) {
            future.return (result);
          } else {
            future.return (error);
          }
        });
      return future.wait();
    }

});
