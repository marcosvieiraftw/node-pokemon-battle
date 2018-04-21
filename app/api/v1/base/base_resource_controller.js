'use strict';

const _ = require('lodash');

const BaseController = require('../base/base_controller');

class BaseResourceController extends BaseController {
    constructor(db, resource, config) {
        super(db, config);
        this.model = db.sequelize.model(resource);
    }

    create(req, res, next) {
        this.model
            .create(req.body)
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                next(this.handleError(err));
            });
    }

    index(req, res, next) {
        this.model
            .findAll()
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                next(err);
            });
    }

    show(req, res, next) {
        this._get(req.params.id)
            .then(response => {
                if (response) {
                    res.json(response);
                } else {
                    this._throwNotFound(next);
                }
            })
            .catch(err => {
                next(err);
            });
    }

    update(req, res, next) {
        this.model
            .update(req.body, {
                individualHooks: true,
                where: req.params
            })
            .then(() => {
                this.show(req, res, next);
            })
            .catch(err => {
                next(this.handleError(err));
            });
    }

    destroy(req, res, next) {
        this._get(req.params.id)
            .then(resource => {
                if (resource) {
                    this.model
                        .destroy({
                            where: req.params
                        })
                        .then(() => {
                            res.status(204).send();
                        })
                        .catch(err => {
                            next(err);
                        });
                } else {
                    this._throwNotFound(next);
                }
            })
            .catch(err => {
                next(err);
            });
    }

    // Local functions
    _get(id) {
        return this.model
            .findOne({
                where: {
                    id: id
                }
            });
    }

    _throwNotFound(next) {
        let err = new Error();
        err.status = 404;
        err.message = 'Resource not found';
        next(err);
    }
}

module.exports = BaseResourceController;
