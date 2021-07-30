"use strict";

const config = require('../config');
const FCM = require('fcm-push');
const fcm = new FCM("AAAAfsTuZtM:APA91bEUuFqmKjLCsMnIJUoluwKQZoynnU6BcFjjuc0NsJpCRi0E_O-yqDRakLAmHvkAqBSOd4dte2c2Vx2ld0tybkZofUYOBy6BVt4hvndJh9JbAmBznYYaYgU8i6l8uKdeofIoHNuu");

var exportFuns = {};

module.exports = {

    /**
 * Notification Payload Structure
 * *
{
        to: 'device_token',
        data: {
            id:212,
            message: 'test message',
            title: 'test title'
            custom_message_type:1, 1 for admin,2 for product, 3 for order details,4 order list 
            
        },
        notification: {
            title: 'test title',
            body: 'test message',
            badge : 2,
            icon : 'icon_notification',
            color : '#059A79',
            sound : 'notification',
            click_action : "BROADCAST"
        }
    }
 *
*/

    sendForAndriodIos: (messagePattern) => {
        fcm.send(messagePattern, function (err, response) {
            if (err) {
                console.log("Notifications failed.", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// exportFuns.sendForAndriodIos = (messagePattern) => {

//     fcm.send(messagePattern, function (err, response) {
//         if (err) {
//             console.log("Notifications failed.", err);
//         } else {
//             //console.log("Successfully sent with response: ", response);
//         }
//     });
// }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//module.exports = exportFuns;