'use strict';

const BattleModel = require('./battle_model');

class BattleController {
    constructor(db) {
        this.pokemonModel = db.sequelize.model('Pokemon');
    }

    duel(req, res, next) {
        const battleModel = new BattleModel(this.pokemonModel);
        battleModel.battle(req.params, this.pokemonModel).then((duelResult) => {
            return res.json(duelResult);
        }).catch(err => {
            return res.status(404).json({
                status: 404,
                message: err.message
            });
        });
    }

}

module.exports = BattleController;
