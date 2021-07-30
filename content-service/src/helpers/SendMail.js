"use strict";

const config = require('../config');
const nodemailer = require("nodemailer");



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = {

sendEmail: (to_email, subject, message) => {

	var transport = nodemailer.createTransport({
		host: config.email_auth_host,
		secureConnection: true,
		port: config.email_auth_port,
		auth: {
			user: config.email_auth_user,
			pass: config.email_auth_password
		}
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: config.email_from_name + "<" + config.email_from + ">",
		to: to_email,
		subject: subject,
		html: message
	}

	// send mail with defined transport object
	transport.sendMail(mailOptions, function (err, response) {
		if (err) {
			console.log(err.toString());
		} else {
			console.log("Mail sent.");
		}
	});
},

sendMultiEmails: (emails_array, subject, message) => {

	var transport = nodemailer.createTransport({
		host: config.email_auth_host,
		secureConnection: true,
		port: config.email_auth_port,
		auth: {
			user: config.email_auth_user,
			pass: config.email_auth_password
		}
	});

	emails_array.forEach(function (to_email, i, array) {

		// setup e-mail data with unicode symbols
		var mailOptions = {
			from: config.email_auth_name + "<" + config.email_auth_user + ">",
			subject: subject,
			html: message
		}

		mailOptions.to = to_email;

		// send mail with defined transport object
		transport.sendMail(mailOptions, function (err) {

			if (err) {
				console.log('Sending to ' + to_email + ' failed: ' + err.toString());
				return;
			} else {
				console.log('Sent to ' + to_email);
			}

			if (i === maillist.length - 1) { mailOptions.transport.close(); }
		});
	});
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}