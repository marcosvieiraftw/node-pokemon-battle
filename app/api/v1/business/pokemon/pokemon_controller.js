'use strict';

const BaseResourceController = require('../../base/base_resource_controller');

class PokemonController extends BaseResourceController {
    constructor(db) {
        super(db, 'Pokemon');
    }

    create(req, res, next) {
        this.model
            .create(req.body, {
                fields: ['tipo', 'treinador']
            })
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                next(this.handleError(err));
            });
    }

    update(req, res, next) {
        this.model
            .update(req.body, {
                individualHooks: true,
                where: req.params,
                fields: ['treinador']
            })
            .then((response) => {
                if (response[1].length) {
                    res.status(204).send();
                } else {
                    this._throwNotFound(next);
                }
            })
            .catch(err => {
                next(this.handleError(err));
            });
    }
}

module.exports = PokemonController;
