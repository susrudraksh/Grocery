"use strict";

var ContentServices = require('./ContentServices');
var ErrorLogs = require('./ErrorLogs');
var SettingServices = require('./SettingServices');
var DeliveryServices = require('./DeliveryServices');

module.exports = {
	ContentServices: ContentServices,
	ErrorLogsService: ErrorLogs,
	SettingServices: SettingServices,
	DeliveryServices:DeliveryServices
};