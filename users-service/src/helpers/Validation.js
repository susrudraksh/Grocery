"use strict";

var exportFuns = {};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exportFuns.isValidUrl = (str) => {

    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return !!pattern.test(str);
}

exportFuns.getErrorMessage = (errorObj) => {

    var errorMsg = "";
    if (errorObj && errorObj.name == "ValidationError") {
        for (let field in errorObj.errors) {
            errorMsg += errorObj.errors[field].message + " ";
        }
    }

    if (errorObj && errorObj.name == "CastError") {
        errorMsg += errorObj.reason;
    }

    if (errorObj && errorObj.name == "MongoError") {

        if (errorObj.code == 11000) {

            if (errorObj.errmsg.includes("username_1")) {
                errorMsg += "Username is already exist";
            } else if (errorObj.errmsg.includes("email_1")) {
                errorMsg += "Email address is already exist";
            } else if (errorObj.errmsg.includes("phone_1")) {
                errorMsg += "Phone number is already exist";
            } else {
                errorMsg += errorObj.errmsg;
            }

        } else {
            errorMsg += errorObj.errmsg;
        }
    }

    if (errorMsg == "") {
        errorMsg += errorObj.toString();
    }

    return errorMsg;
}

exportFuns.getValidationErrors = (errorObj) => {

    var errorsArr = [];
    if (errorObj && errorObj.name == "ValidationError") {
        for (let field in errorObj.errors) {
            errorsArr.push({
                errField: errorObj.errors[field].path,
                errText: errorObj.errors[field].message,
            });
        }
        return errorsArr;
    }
    return errorsArr;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = exportFuns;