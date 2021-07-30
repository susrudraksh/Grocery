"use strict";

const { UsersOtp } = require("../models");
const { Common, SendMail, SendSMS } = require('../helpers');
const config = require('../config');
const ejs = require("ejs"); 


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const OtpServices = module.exports = {

    saveAndSendOtp : async function (createPattern) {

        return UsersOtp.findOne(createPattern).then(resultData => {
    
            if (!resultData) {
                var otp_number = Common.generateRandomNumber(4);
            } else {
    
                var otp_created_time = resultData.updatedAt;
                var current_time = new Date();
                var minutes_diff = Math.floor((Math.abs(current_time - otp_created_time) / 1000) / 60);
    
                if (minutes_diff > 30) {
                    var otp_number = Common.generateRandomNumber(4);
                } else {
                    var otp_number = resultData.otp_number;
                }
            }
    
            createPattern.otp_number = otp_number;
    
            if (createPattern.email && createPattern.email != "") {
                sendOtpViaEmail(otp_number, createPattern.email);
            }
    
            if (createPattern.country_code && createPattern.phone && createPattern.phone != "") {
                //sendOtpViaPhone(otp_number, createPattern.country_code, createPattern.phone);
            }
    
            if (!resultData) {
    
                return UsersOtp.create(createPattern).then(createRes => {
                    return createRes;
                }).catch(err => {
                    throw err;
                });
    
            } else {
    
                return UsersOtp.updateOne({ _id: resultData._id }, createPattern).then(updateRes => {
                    return resultData;
                }).catch(err => {
                    throw err;
                });
            }
    
        }).catch(err => {
            throw err;
        });
    },
    
    updateRecord : async function (findPattern, updatePattern) {
    
        return UsersOtp.updateOne(findPattern, updatePattern).then(updateRes => {
            return updateRes;
        }).catch(err => {
            throw err;
        });
    },
    
    oneRecord : async function (findPattern) {
    
        return UsersOtp.findOne(findPattern).sort({createdAt: -1}).then(resultData => {
            return resultData;
        }).catch(err => {
            throw err;
        });
    },
    
    deleteRecord : async function (deletePattern) {
    
        return UsersOtp.deleteMany(deletePattern).then(deleteRes => {
            return deleteRes;
        }).catch(err => {
            throw err;
        });
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function sendOtpViaPhone(otp_number, country_code, phone) {

    var message = "Your OTP is: " + otp_number;
    var to_phone = country_code + phone;

    SendSMS.sendTwilioSMS(to_phone, message);
}

function sendOtpViaEmail(otp_number, email) {

    var customData = { siteTitle: config.siteTitle };
    customData.otp_number = otp_number;
    var filePath = config.rootPath + '/src/views/email_templates/send_otp.ejs';

    ejs.renderFile(filePath, customData, (err, data) => {
        if (err) {
            throw err;
        } else {
            var subject = "OTP Confirmation";
            SendMail.sendEmail(email, subject, data);
        }
    });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
