'use strict';

module.exports = {
    send: (req, res, status, message, data = {}) =>{
        if(status==500){
            var data = {
                message: message,
                method: req.method,
                headers: req.headers,
                body: req.body,
                params: req.params,
                query: req.query,

            }
        }

        var resJson = {
            "message": message,
            "data": data
        }
        res.status(status).json(resJson);
        return ;
    }
}
