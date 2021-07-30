"use strict";
const config = require("../../config");
var request =  require('request');
const { OrderServices, UserServices, TransactionHistoryServices, NotificationServices } = require('../../services');
const {Ccavenu,Response,Validation,Messages,Common} = require("../../helpers");
var ObjectID = require('mongoose').Types.ObjectId;
const Order = require("../../models/Order");
var qs = require("qs");
var axios = require("axios");
//https://logintest.ccavenue.com/apis/servlet/DoWebTrans

const CcavenuPayment = {
    genrateEncRequest:(req,res)=>{
        // var data = {
        //     merchant_id:"376194",
        //     order_id:"6634562",
        //     redirect_url:"http://3.7.83.168:3060/user_service/customer/payment/complete_payment",
        //     cancel_url:"http://3.7.83.168:3060/user_service/customer/payment/complete_payment",
        //     amount:"1.00",
        //     currency:"INR",
        //     merchant_param1:"Wallet",//payment for
        //     merchant_param2:"608a8827766cc6385052990a"
        // }
        var data ={
            "order_no": "6634562"
        }
        const url = Common.JsonTogetRequest(data);
        const EncRequest = Ccavenu.encrypt(url,config.ccAvenu.workingKey);

        var decrypt = Ccavenu.decrypt("7b62918c8210d76ef8132bbab846da4455f39c8ae131104dc0dd162dc6f68ff4792ad9b81876a58c3218ba84b8773cecde10ff0147695781c7216cdbf624c43380ad4c46e0972d7876102aafa4e262e79ffd92d698bf5a450421c3bb0f24ea5a7281c0626de4e6eaa38674aa35b43ab7f9c0f9102da6a7aab4afe1ef84bd230595b8c3edec0c79df5570ff377b61eca670475f344c51dd73d12c44b2903bc6e632460a23b8a8ccbfb6cc3fe29c5e32520d2241e0b1adec8bacf3589a81e1cd3f",config.ccAvenu.workingKey);
        console.log(decrypt);
        //decrypt = Common.getRequesttoJson(decrypt); 
        console.log("decrypt",decrypt)
        
       // console.log(EncRequest);
    },

    completePayment:async(req,res)=>{
      //  try{
            console.log("req.body",req.body)
            var order_id = req.body.orderNo || "";
            var encResp = req.body.encResp || "";
            var errors = [];
            if (order_id && order_id == "") {
                errors.push({ errField: "order_id", errText: Messages.BAD_REQUEST });
            }
            if(encResp && encResp==""){
                errors.push({ errField: "encResp", errText: Messages.BAD_REQUEST });
            }
            if (errors.length > 0) {
                console.log(err);
                let resMsg = errors.pop().errText;
                Response.send(req, res, 400, resMsg, { errors: errors });
            } else {
                var decrypt = Ccavenu.decrypt(encResp,config.ccAvenu.workingKey);
                decrypt = Common.getRequesttoJson(decrypt); 
                console.log("decrypt",decrypt)
                if(decrypt && decrypt.order_status=="Success"){
                    console.log("Success")
                 if(decrypt.merchant_param1=="Wallet"){
                    console.log("merchant_param2",decrypt.merchant_param2);
                    console.log("amount",decrypt.amount)
                    console.log("order_id",decrypt.order_id);
                    console.log("tracking_id",decrypt.tracking_id);
                   
                    var userData = await UserServices.updateRecord({ _id: ObjectID(decrypt.merchant_param2) }, { $inc: { wallet: (parseFloat(decrypt.amount)) } }, 'id wallet username');
                        var addPattern = {};
                        var transition_id = Common.generateRandomNumber(8);
                        addPattern.user_id = decrypt.merchant_param2;
                        addPattern.user_type = 3;
                        addPattern.transition_id = transition_id;
                        addPattern.reason = 'Add Money';
                        addPattern.amount = decrypt.amount;
                        addPattern.wallet_amount = userData.wallet;
                        addPattern.payment_type = "Online";
                        addPattern.payment_for = "Wallet";
                        addPattern.amount_type = 1;
                        addPattern.request_type = 1;
                        addPattern.wallet_order_id = decrypt.order_id;
                        addPattern.payment_transaction_id = decrypt.tracking_id;
                        addPattern.reference_no= decrypt.reference_no;
                        
                        var success  = await TransactionHistoryServices.createRecord(addPattern);
                        var ResMess= "Success";
                        Response.send(req,res,200,ResMess,success);
                    }else{
                        console.log("order");
                        let aggregateConditions = [
                            {
                                $match: { _id: ObjectID(decrypt.merchant_param2) },
                            },  
                        ];
                        var userData = await UserServices.oneRecord(aggregateConditions);
                        console.log("userData",userData);
                        var addPattern = {};
                        var transition_id = Common.generateRandomNumber(8);
                        addPattern.user_id = decrypt.merchant_param2;
                        addPattern.order_id =decrypt.order_id;
                        addPattern.user_type = 3;
                        addPattern.transition_id = transition_id;
                        addPattern.reason = "Order";
                        addPattern.amount = decrypt.amount;
                        addPattern.wallet_amount = userData.wallet;
                        addPattern.payment_type = "Online";
                        addPattern.amount_type = 1;
                        addPattern.request_type = 2;
                        addPattern.payment_transaction_id = decrypt.tracking_id;
                        addPattern.reference_no = decrypt.reference_no;
                        console.log("addPattern",addPattern);

                        await TransactionHistoryServices.createRecord(addPattern);
                        console.log("transaction ok");

                        OrderServices.updateRecord({order_id:decrypt.order_id},{order_status:0})
                        console.log("update order ok");
                        var ResMess= "Success";
                        Response.send(req,res,200,ResMess,success);
                    }
                }else{
                    console.log("false");
                    if(decrypt.merchant_param1=="Wallet"){
                        var addPattern = {};
                        var transition_id = Common.generateRandomNumber(8);
                        addPattern.user_id = decrypt.merchant_param2;
                        addPattern.user_type = 3;
                        addPattern.transition_id = transition_id;
                        addPattern.reason = 'Add money request failed';
                        addPattern.amount = decrypt.amount;
                        addPattern.payment_type = "Online";
                        addPattern.payment_for = "Wallet";
                        addPattern.amount_type = 1;
                        addPattern.request_type = 7;
                        addPattern.wallet_order_id = decrypt.order_id;
                        addPattern.payment_transaction_id = decrypt.tracking_id;
                        var error = await TransactionHistoryServices.createRecord(addPattern);
                        var ResMess= "Failed";
                        Response.send(req,res,200,ResMess,error);
                    }else{
                        console.log("false order");
                        var addPattern = {};
                        var transition_id = Common.generateRandomNumber(8);
                        addPattern.user_id = decrypt.merchant_param2;
                        addPattern.user_type = 3;
                        addPattern.transition_id = transition_id;
                        addPattern.reason = 'Order Cancelled due to payment failed.';
                        addPattern.amount = decrypt.amount;
                        addPattern.payment_type = "Online";
                        addPattern.payment_for = "Order";
                        addPattern.amount_type = 1;
                        addPattern.request_type = 7;
                        addPattern.order_id = decrypt.order_id;
                        addPattern.payment_transaction_id = decrypt.tracking_id;
                        var error = await TransactionHistoryServices.createRecord(addPattern);
                        OrderServices.updateRecord({order_id:decrypt.order_id},{order_status:7})
                        var ResMess= "Failed";
                        Response.send(req,res,200,ResMess,error);
                    }
                }
           }

        // }catch(err){
        //     console.log(err)
        // }
    },


    checkTransationStatus:(req,res)=>{
        var order_id = req.body.order_id || "";
        var payment_for = req.body.payment_for || "";
        var user_id = Common.getUserdetailsBytoken(req.headers.authorization) || null;
        var errors = {};
        if (order_id && order_id == "") {
            errors.push({ errField: "order_id", errText: Messages.ORDER_ID_REQUIRED });
        }
        if(payment_for && payment_for==""){
            errors.push({ errField: "payment_for", errText: Messages.PAYMENT_FOR_REQUIRED });
        }
        if (errors.length > 0) {
            let resMsg = errors.pop().errText;
            Response.send(req, res, 400, resMsg, { errors: errors });
        } else {
            var filter = {};
            if(payment_for=="Wallet"){
                filter.wallet_order_id = order_id;
            }else{
                filter.order_id = order_id;
            }
          //  filter.payment_for=payment_for;
            filter.user_id= user_id;
            console.log(filter)
           
            var TransactionRecord = TransactionHistoryServices.oneRecord(filter).then( async result=>{
                if(result){
                    var ResMess= "Success";
                    Response.send(req,res,200,ResMess,result);
                }else{
                    var ResMess= Messages.NOT_FOUND;
                    Response.send(req,res,400,ResMess);
                }
            }).catch(err=>{
                let resMsg = Validation.getErrorMessage(err);
                Response.send(req, res, 500, resMsg);
            })
        }

    },

    cancelPayment:async(data)=>{
        try{
            var order_id = data.order_id;
            var getTransactionData = await TransactionHistoryServices.oneRecord({wallet_order_id:order_id});
            if(getTransactionData){
                var resmessage = { msg: "", status: 200, data: {} };
                var genrateRefundNo = "refund"+Math.floor(Date.now() / 1000);
                var data = {
                // order_id:"5188708",
                    reference_no:getTransactionData.payment_transaction_id,
                    refund_amount:getTransactionData.amount,
                    refund_ref_no:genrateRefundNo
                }
                const EncRequest = Ccavenu.encrypt(JSON.stringify(data),config.ccAvenu.workingKey);
                // var getpaymentstatus = CcavenuPayment.CheckPaymentStatus(data);

                var newdata ={
                    command:"refundOrder",
                    request_type:'JSON',
                    response_type:'JSON',
                    enc_request: EncRequest,
                    access_code:config.ccAvenu.accessCode,
                    //version:"1.2"
                }

                const url1 = Common.JsonTogetRequest(newdata);
        
                var data = newdata;
                var newconfig = {
                    method: "POST",
                    url: "https://api.ccavenue.com/apis/servlet/DoWebTrans?"+url1,
                    headers: { "Content-Type": "application/json" },
                    data: data,
                };
    
                axios(newconfig)
                    .then(async function (response) {
                    resmessage.msg = response;
                    resmessage.status = 200;
                    resmessage.data = response;
                    var response = response.data;
                    response = new URLSearchParams(response);
                    var enc_response = response.get('enc_response');
                    var decrypt = Ccavenu.decrypt(enc_response,config.ccAvenu.workingKey);
                    decrypt = JSON.parse(decrypt); 

                        if(decrypt && decrypt.Refund_Order_Result && decrypt.Refund_Order_Result.refund_status==0){
                            var message = "your order has been cancelled and deducted amount will be refunded to your respective account.";
                            var checkupdate = await TransactionHistoryServices.updateRecord({wallet_order_id:order_id},{request_type:5,reason:message,refund_ref_no:genrateRefundNo});
                            console.log("success",checkupdate);
                        }else{
                            console.log("decrypt",decrypt);
                        }
                    })
                    .catch(function (error) {
                    resmessage.msg = "Error";
                    resmessage.status = 500;
                    resmessage.data = JSON.stringify(error);
                     console.log(error);
                   
                    });
            }
        } catch (err) {
          console.log(err);
        }
    },

    CheckPaymentStatus:(data)=>{
       
        try{
            var resmessage = { msg: "", status: 200, data: {} };
            var data = {
                order_no:data.order_id,
            }
        //    // console.log(url)
             const EncRequest = Ccavenu.encrypt(JSON.stringify(data),config.ccAvenu.workingKey);
            var newdata ={
                command:"orderStatusTracker",
                request_type:'JSON',
                response_type:'JSON',
                enc_request: EncRequest,
                access_code:config.ccAvenu.accessCode,
                version:"1.2"
            }
                const url1 = Common.JsonTogetRequest(newdata);
                var data = newdata;
                var newconfig = {
                    method: "POST",
                    url: "https://api.ccavenue.com/apis/servlet/DoWebTrans?"+url1,
                    headers: { "Content-Type": "application/json" },
                    data: "",
                };
        
          axios(newconfig)
            //.then(response => response.json()) 
            .then(function (response) {
            
              resmessage.msg = "Success";
              resmessage.status = 200;
              resmessage.data = response;
              var response = response.data;
              response = new URLSearchParams(response);
              var enc_response = response.get('enc_response');
              var decrypt = Ccavenu.decrypt(enc_response,config.ccAvenu.workingKey);
              decrypt = JSON.parse(decrypt); 
              //console.log("decrypt1",decrypt)
              //return resmessage;
            })
            .catch(function (error) {
              resmessage.msg = "Error";
              resmessage.status = 500;
              resmessage.data = JSON.stringify(error);
             // console.log(error);
              return resmessage;
            });
        } catch (err) {
          console.log(err);
        }
    }
   
}
//CcavenuPayment.cancelPayment({order_id:"2523113"})
 //CcavenuPayment.genrateEncRequest()
module.exports = CcavenuPayment;