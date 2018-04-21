'use strict';

const _ = require('lodash');

module.exports = exports = {
    logError: logError,
    handleError: handleError,
    throw404: throw404
};

////////////////////

function logError(err, req, res, next) {
    if (err) {
        console.error(err);
        return next(err);
    }
    next();
}

function handleError(err, req, res, next) {
    if (err) {
        let status = err.status || 400;
        res.status(status).send(err);
    }
}

function throw404(req, res, next) {
    let err = new Error();
    err.status = 404;
    err.message = 'API Endpoint not Found';
    next(err);
}
