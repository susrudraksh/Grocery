"use strict";

const dateFormat = require('dateformat');
const moment = require("moment");
const momentTimezone = require("moment-timezone");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = {

convertLocalToUtcByTimezone: (dateTime, timezone, format = "") => {

    var now = momentTimezone();
    var serverOffset = now.utcOffset();
    now.tz(timezone);
    var timezoneOffset = now.utcOffset();
    var diffInMinutes = serverOffset - timezoneOffset;
    var diffInMS = diffInMinutes * 60000; // miliseconds

    var serverDateTime = new Date(dateTime).getTime();
    var timezoneTime = new Date(serverDateTime + diffInMS).getTime();
    return exportFuns.getDateFormat(timezoneTime, format);
},

convertUtcToLocalByTimezone: (dateTime, timezone, format = "") => {

    var now = momentTimezone();
    var serverOffset = now.utcOffset();
    now.tz(timezone);
    var timezoneOffset = now.utcOffset();
    var diffInMinutes = serverOffset - timezoneOffset;
    var diffInMS = diffInMinutes * 60000; // miliseconds

    var serverDateTime = new Date(dateTime).getTime();
    var timezoneTime = new Date(serverDateTime - diffInMS).getTime();
    return exportFuns.getDateFormat(timezoneTime, format);
},

getDateFormat: (date, format, timezone = "UTC") => {

    var date = new Date(date).toLocaleString('en-US', {
        timeZone: timezone
    });

    // ref: https://www.npmjs.com/package/dateformat
    return dateFormat(new Date(date), format);
},

getCurrentDate: () => {
    var current_datetime = new Date();
    var modified_dateonly = exportFuns.getDateFormat(current_datetime, "yyyy-mm-dd");
    return new Date(modified_dateonly);
},

getCurrentDateTime: () => {

    var current_datetime = new Date();
    var modified_datetime = exportFuns.getDateFormat(current_datetime, "isoUtcDateTime");
    return new Date(modified_datetime);
},

getCurrentTime: () => {

    var current_datetime = new Date();
    var current_time = exportFuns.getDateFormat(current_datetime, "HH:MM:ss");
    return current_time;
},

//++++++++++++++++++++++++++++++ Filter Date Methods +++++++++++++++++++++++++++++

// date: a real date
// type: subtract | add
// duration_count: numeric value
// duration_key: days | months | years

getFilteredDate: (date, type, duration_count, duration_key) => {

    var filteredDate = null;
    if (type == "add") {
        filteredDate = moment(date).add(duration_count, duration_key).format();
    } else {
        filteredDate = moment(date).subtract(duration_count, duration_key).format();
    }
    return new Date(filteredDate);
}
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
