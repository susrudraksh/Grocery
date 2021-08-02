"use strict";

const config = require('../config');
const jwt = require('jsonwebtoken');

const { PUBLISH } = require('./Redis');
var aNum = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var bNum = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];


//var Stream = require('stream').Transform;
module.exports = {
    getUserdetailsBytoken: (token, field = null) => {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if (token && token != "") {
            var decoded = jwt.decode(token, config.jwtSecretKey);
            return decoded.login_user_id;
        }
    },

    arrayToObject: (arr) => {

        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            rv[i] = arr[i];
        return rv;
    },

    generateRandomNumber: (digits) => {
        var n = digits > 0 ? digits - 1 : 0;
        return Math.floor(Math.random() * (9 * (Math.pow(10, n)))) + (Math.pow(10, n));
    },

    generatePrice: (distance) => {

        if (distance < 10)
            return 0;
        if (distance > 1000)
            return 200
        if (distance > 500)
            return 150
        if (distance > 100)
            return 100
        if (distance > 50)
            return 50
        if (distance > 10)
            return 20

    },

    distance: (lat1, lon1, lat2, lon2, unit) => {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }
            return dist;
        }
    },

    JsonTogetRequest:(data)=>{
        const url = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&');
        return url;
    },

    getRequesttoJson:(url)=>{
        const result = JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        return result;
    

    },

  
    inWords: (num)=> {
        if ((num = num.toString()).length > 9) return 'overflow';
        var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (aNum[Number(n[1])] || bNum[n[1][0]] + ' ' + aNum[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (aNum[Number(n[2])] || bNum[n[2][0]] + ' ' + aNum[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (aNum[Number(n[3])] || bNum[n[3][0]] + ' ' + aNum[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (aNum[Number(n[4])] || bNum[n[4][0]] + ' ' + aNum[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? '' : '') + (aNum[Number(n[5])] || bNum[n[5][0]] + ' ' + aNum[n[5][1]]) : '';
        console.log("str",str)
        str += (str=="")?'Zero only ':' only'
        return str;
    }



}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

