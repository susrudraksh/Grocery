module.exports = {

	// HTTP ERRORS
	BAD_REQUEST: "Bad Request",	// 400
	UNAUTHORIZED: "Unauthorized",	// 401
	PAYMENT_REQUIRED: "Payment Required",	// 402
	FORBIDDEN: "Forbidden",	// 403
	NOT_FOUND: "Not Found",	// 404
	REQUEST_TIMEOUT: "Request Timeout",	// 408
	INTERNAL_SERVER_ERROR: "Internal Server Error", // 500

	// CONTENT
	CONTENT_UPDATE_SUCCESS: "Content has updated successfully.",
	INVALID_CONTENT_KEY: "Invalid content key.",
	NOT_ALLOW_CONTENT_KEY: "Not allowed to update content with this key.",

	// FAQS
	FAQ_CREATE_SUCCESS: "FAQ has created successfully.",
	FAQ_UPDATE_SUCCESS: "FAQ details has updated successfully.",
	FAQ_STATUS_UPDATE_SUCCESS: "FAQ status has changed successfully.",
	FAQ_DELETE_SUCCESS: "FAQ has deleted successfully.",
	NO_FAQS_EXIST: "No FAQs Yet.",
	FAQ_NOT_EXIST: "FAQ doesn't exist.",
	FAQ_DATA_MISSING: "FAQ data not found in database.",
	INVALID_FAQ_REQUEST: "Invalid FAQ Request.",

	// SETTINGS
	SETTINGS_UPDATE_SUCCESS: "Settings has updated successfully.",
	SETTINGS_NOT_EXIST: "Settings data not found.",

	// ERROR LOGS
	ERRORLOG_DELETE_SUCCESS: "Error log has deleted successfully.",
	ERRORLOG_NOT_EXIST: "Error log doesn't exist.",
};