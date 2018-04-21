'use strict';

const Controller = require('./battle_controller');

const Router = function (router, db) {
    let battle = new Controller(db);

    router
        .route('/batalhar/:pokemonAId/:pokemonBId')

        /**
         * @api {post} /batalhar/:pokemonAId/:pokemonBId Pokemon battle
         * @apiName PokemonBattle
         * @apiGroup Battle
         * 
         * @apiParam {Number} pokemonAId PokemonA unique ID.
         * @apiParam {String} pokemonBId PokemonB unique ID.
         * 
         * @apiSuccess {Object[]} vencedor Winner information.
         * @apiSuccess {Number} vencedor.id Pokemon unique ID.
         * @apiSuccess {String} vencedor.tipo Pokemon type.
         * @apiSuccess {String} vencedor.treinador Pokemon trainer.
         * @apiSuccess {Number} vencedor.nivel Pokemon level.
         * 
         * @apiSuccess {Object[]} loser Loser information.
         * @apiSuccess {Number} loser.id Pokemon unique ID.
         * @apiSuccess {String} loser.tipo Pokemon type.
         * @apiSuccess {String} loser.treinador Pokemon trainer.
         * @apiSuccess {Number} loser.nivel Pokemon level.
         * 
         * @apiSuccessExample {json} Success-Response:
         *  HTTP/1.1 200 OK
         *  {   
         *      "vencedor": {
         *          "id": 1,
         *          "tipo": "mewtwo",
         *          "treinador": "Marcos",
         *          "nivel": 2
         *      },
         *      "perdedor": {
         *          "id": 2,
         *          "tipo": "pikachu",
         *          "treinador": "Joao",
         *          "nivel": 0
         *      }
         *  }
         * 
         *  @apiError NotFound One or more pokemon ID selected for battle doesn`t exists.
         * 
         *  @apiErrorExample Error-Response:
         *   HTTP/1.1 404 Not Found
         *   {
         *       "status": "404",
         *       "message": "Pokemons com nivel 0 são apagados, portanto, escolha outra combinação de IDs para o duelo."
         *   }
         */
        .post((req, res, next) => battle.duel(req, res, next));
};

module.exports = Router;
