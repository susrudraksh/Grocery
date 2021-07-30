"use strict";
const config = require("../config");
const crypto = require("crypto");
/* const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16); */
const key = Buffer.from(
  "MTIzNDU2Nzg5MGFiY2RlZmdoaWprbG1ub3BxcnN0dXY=",
  "base64"
);
const iv = Buffer.from("26vFZGhH66xFszo59pEaWA==", "base64");

//const iv = crypto.randomBytes(16);
module.exports = {
  encrypt: (text) => {
    try {
      let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
      let encrypted = cipher.update(JSON.stringify(text));
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return {
        iv: iv.toString("hex"),
        encryptedData: encrypted.toString("hex"),
      };
    } catch (err) {
      throw err;
    }
  },

  decrypt: (text) => {
    try {
      let iv = Buffer.from(text.iv, "hex");
      let encryptedText = Buffer.from(text.encryptedData, "hex");
      let decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(key),
        iv
      );
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return JSON.parse(decrypted.toString());
    } catch (err) {
      throw err;
    }
  },
};
