/**
 * @api {All} / Global Errors
 * @apiGroup GlobalErrors
 *
 * @apiDescription These errors may occurs globally when either of other apis called. Each error has different status and reason of occurance. These all are for security purpose to protect apis access.
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
        "X-Access-Token": "Access token generated at client for every request.",
        "Authorization": "Auth token received from server after user login.",
        "device_token": "FCM Device Token for Push Notification",
        "device_type": "Device Type. Ex: android / ios / web",
        "local_timezone": "Local Timezone String. Ex: Asia/Kolkata",
        "language": "Language. Ex: en / es"
    }
 *
 * @apiSuccess 200 OK
 * @apiError 400 Bad Request
 * @apiError 401 Unauthorized
 * @apiError 402 Payment Required
 * @apiError 403 Forbidden
 * @apiError 404 Not Found
 * @apiError 408 Request Timeout
 * @apiError 500 Internal Server Error
 *
 * @apiSuccessExample {json} 200 OK
    HTTP/1.1 200 Response
    {
        "message": "Success",
        "data": {}
    }
 *
 * @apiErrorExample {json} 400 Bad Request
    HTTP/1.1 400 Response
    {
        "message": "Bad Request.",
        "data": {}
    }
 *
 * @apiErrorExample {json} 401 Unauthorized
    HTTP/1.1 401 Response
    {
        "message": "Unauthorized",
        "data": {}
    }
 *
 * @apiErrorExample {json} 403 Forbidden
    HTTP/1.1 403 Response
    {
        "message": "Forbidden",
        "data": {}
    }
 *
 * @apiErrorExample {json} 404 Not Found
    HTTP/1.1 404 Response
    {
        "message": "Not Found",
        "data": {}
    }
 *
 * @apiErrorExample {json} 402 Request Timeout
    HTTP/1.1 408 Response
    {
        "message": "Request Timeout",
        "data": {}
    }
 *
 * @apiErrorExample {json} 500 Internal Server Error
    HTTP/1.1 500 Response
    {
      "message": "Internal Server Error",
      "data": {}
    }
*/