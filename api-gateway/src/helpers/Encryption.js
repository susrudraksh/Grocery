'use strict';

const cryptLib = require('@skavinvarnan/cryptlib');
const config =  require('../config');

module.exports = {
    cryptLibDecryption : (encryptedValue) => {
        try {
            return cryptLib.decryptCipherTextWithRandomIV(encryptedValue, config.apiAccessKey);
        } catch (err) {
            throw err.toString();
        }
    },

    getCryptLibEncryption : (plainText) => {
        return cryptLib.encryptPlainTextWithRandomIV(plainText, config.apiAccessKeyForOther);
    }
    
}