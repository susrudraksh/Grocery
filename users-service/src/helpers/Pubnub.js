"use strict";

const config  = require('../config');
const PubNub = require("pubnub");
const pubnub = new PubNub({

    publishKey: "pub-c-e498d12e-a178-4ad2-9164-923d066e648d",

    subscribeKey: "sub-c-bf45da46-40f2-11eb-a73a-1eec528e8f1f",

});
module.exports = {

    publishSampleMessage: async(title="Athwas",textmessage="") =>{
        const result = await pubnub.publish({
            channel: "awesome-channel",
            message: {
                title: title,
                description: textmessage,
            },
        });
    }
}
