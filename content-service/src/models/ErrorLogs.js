"use strict";

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

// define schema
const ErrorLogsSchema = new mongoose.Schema({
    api_name: String,
    message: String,
    request_data: Object
},
    {
        timestamps: true
    }
);

ErrorLogsSchema.plugin(mongoosePaginate);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const ErrorLogs = mongoose.model("error_logs", ErrorLogsSchema);
module.exports = ErrorLogs;
