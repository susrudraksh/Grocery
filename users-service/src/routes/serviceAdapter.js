"use strict";

const config = require('../config');
const axios = require('axios');

module.exports = (baseURL) => {

	var headersOpts = {
		"api_access_key": config.apiAccessKey,
		"internal_api_access_key": config.internalApiAccessKey
	}

	const axiosHttp = axios.create({
		baseURL: baseURL,
		headers: headersOpts
	});

	return axiosHttp;
}