"use strict";

const config  = require('../config');
const jwt = require('jsonwebtoken');
//var Stream = require('stream').Transform;
module.exports = {
    getUserdetailsBytoken :(token,field=null)=>{
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if(token && token != "") {
            var decoded = jwt.decode(token, config.jwtSecretKey);
                return decoded.login_user_id;
        }
    },

    arrayToObject : (arr) => {

        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            rv[i] = arr[i];
        return rv;
    },
    
    generateRandomNumber : (digits) => {
        var n = digits > 0 ? digits - 1 : 0;
        return Math.floor(Math.random() * (9 * (Math.pow(10, n)))) + (Math.pow(10, n));
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

