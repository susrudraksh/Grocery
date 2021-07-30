"use strict";
const mongoConn = require("../db");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const TransactionHistorySchema = new mongoose.Schema(
  {
    transition_id: {
      type: String,
      maxlength: 50,
      trim: true,
    },
    payment_transaction_id: {
      type: String,
      maxlength: 50,
      trim: true,
    },
    reason: {
      type: String,
      trim: true,
    },
    user_id: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    sender_id: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    user_type: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    sender_type: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    amount: { type: String, default: "0.00" },
    wallet_amount: { type: String, default: "0.00" },
    payment_type: { type: String, enum: ['Cash', 'Credit','Wallet',"Online"]},
    payment_for: { type: String, enum: ['Wallet', 'Order']},
    amount_type: { type: Number, enum: [1, 2] }, // 1(add)/2(deduct)
    order_id: { type: String },
    sub_order_id: {  type: mongoose.ObjectId,},
    business_category_id: {  type: mongoose.ObjectId },
    wallet_order_id: { type: String },
    all_return: {  type: Number },
    reference_no: { type: String },
    refund_ref_no: { type: String },
   

    //1 for money add/deduct , 2 for placed order,3 courier eraning,4 cancel order amount refund,5=return  order amount ,6 for payment pending,7 for payment failed
    request_type: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
TransactionHistorySchema.virtual("user", {
  ref: "users",
  localField: "user_id",
  foreignField: "_id",
});

TransactionHistorySchema.plugin(aggregatePaginate);
const TransactionHistory = mongoose.model("transaction_history", TransactionHistorySchema);
module.exports = TransactionHistory;
