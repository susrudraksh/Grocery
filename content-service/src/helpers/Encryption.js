'use strict';

const cryptLib = require('@skavinvarnan/cryptlib');
const config =  require('../config');
const jwt = require('jsonwebtoken');
const Messages =  require('./message');
const bcrypt = require('bcryptjs');

module.exports = {
    cryptLibDecryption : (encryptedValue) => {
       
        try {
            return cryptLib.decryptCipherTextWithRandomIV(encryptedValue, config.apiAccessKeyForOther);
        } catch (err) {
           throw Messages.NOT_ALLOW_ACCESS_WEBSERVICES;
        }
    },
    
    compareBcryptEncryption : (textStr, encryptText) => {
        return bcrypt.compareSync(textStr, encryptText);
    },

    getJwtEncryption : (dataObj = {}) => {
        return jwt.sign(dataObj, config.jwtSecretKey, { expiresIn: config.appLoginSessionExpiryTime + 'm' });
    },
    getBcryptEncryption: (textStr) => {
        return bcrypt.hashSync(textStr, 10);
    }
}