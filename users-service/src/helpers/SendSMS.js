"use strict";

/**
* Twilio References:
* 1. Get Credentials: https://www.twilio.com/console/project/settings
* 2. Get SMS Logs: https://www.twilio.com/console/sms/logs
* 3. Get Documentation: https://www.twilio.com/docs/sms/quickstart/node
* 4. Add Numbers for Testing Purpose: https://www.twilio.com/console/phone-numbers/verified
*/

var config = require('../config');
const client = require('twilio')(config.twilioAccountSid, config.twilioAuthToken);

var exportFuns = {};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exportFuns.sendTwilioSMS = (to_phone, message) => {
    client.messages
        .create({
            body: message,
            from: config.twilioFromPhone,
            to: to_phone   // Note: to_phone have country code and phone number format.
        })
        .then(message => {
            console.log("SMS Sent Successfully.")
            //console.log(message)
        })
        .catch(err => {
            console.log(err.toString())
        });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = exportFuns;