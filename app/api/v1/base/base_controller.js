'use strict';

const _ = require('lodash');

class BaseController {
    constructor(db, config) {
        this.db = db;
        this.config = config;
    }

    conflict(message) {
        let errorMessage = message || 'Conflict';
        return this.errorReponse(409, errorMessage);
    }

    forbidden(message) {
        let errorMessage = message || 'Forbidden';
        return this.errorReponse(403, errorMessage);
    }

    notFound(message) {
        let errorMessage = message || 'Resource not found';
        return this.errorReponse(404, errorMessage);
    }

    unauthorized(message) {
        let errorMessage = message || 'Missing token or invalid token';
        return this.errorReponse(401, errorMessage);
    }

    unprocessableEntity(message) {
        let errorMessage = message || 'Invalid credentials or missing parameters';
        return this.errorReponse(422, errorMessage);
    }

    errorReponse(status, message) {
        let err = new Error();
        err.status = status || 400;
        err.message = message || 'Bad request';
        return err;
    }

    handleError(error) {
        let message = error.message || 'Undefined error';

        let errorList = _.get(error, 'errors');

        if (_.isEmpty(errorList) === false) {
            let errorMessageList = _.map(errorList, errorItem => {
                return errorItem.message || 'Undefined error';
            });

            message = errorMessageList.toString();
        }

        let nameStatusMap = {
            'SequelizeUniqueConstraintError': 409,
            'SequelizeValidationError': 422
        };

        let status = nameStatusMap[error.name];

        return this.errorReponse(status, message);
    }

    plain(response, options) {
        if (Array.isArray(response)) {
            return _.map(response, record => {
                record = record.toJSON();
                record = _.omit(record, _.get(options, 'exclude'));
                return record;
            });
        } else {
            return response.toJSON();
        }
    }
}

module.exports = BaseController;
