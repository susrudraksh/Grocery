"use strict";

const config = require('../config');

// nodejs geocoder for latitude, longitude
const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: config.geocoderApiKey,
    formatter: null
};
const geocoder = NodeGeocoder(options);

module.exports = {

    getLatLongByAddress: (fullAddress) => {

        return geocoder.geocode(fullAddress).then(result => {
            return result;
        }).catch(err => {
            return [];
        });
    },

    getAddressByLatLong: (latitude, longitude) => {

        return geocoder.reverse({ lat: latitude, lon: longitude }).then(result => {
            return result;
        }).catch(err => {
            return null;
        });
    },

    getDistanceByLatLong: (lat1, lon1, lat2, lon2, unit) => {

        // ref: https://www.geodatasource.com/developers/javascript
        // default unit is "M" in Miles
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return parseFloat(dist.toFixed(2))
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

