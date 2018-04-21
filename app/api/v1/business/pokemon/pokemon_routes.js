'use strict';

const Controller = require('./pokemon_controller');

const Router = function(router, db) {
    let pokemon = new Controller(db);

    router
        .route('/pokemons')
        /**
         * @api {get} /pokemons Pokemons list
         * @apiName GetPokemons
         * @apiGroup Pokemon
         *
         * @apiSuccess {Object[]} pokemons List of pokemons.
         * @apiSuccess {Number} pokemons.id Pokemon unique ID.
         * @apiSuccess {String} pokemons.tipo Pokemon type.
         * @apiSuccess {String} pokemons.treinador Pokemon trainer.
         * @apiSuccess {Number} pokemons.nivel Pokemon level.
         * 
         * @apiSuccessExample {json} Success-Response:
         *  HTTP/1.1 200 OK
         *  [{
         *      "id": 1,
         *      "tipo": "mewtwo",
         *      "treinador": "Marcos",
         *      "nivel": 2
         *   }]
         */
        .get(pokemon.index.bind(pokemon))

        /**
         * @api {post} /pokemons Pokemon create
         * @apiName CreatePokemon
         * @apiGroup Pokemon
         * 
         * @apiParam {String} tipo Pokemon type.
         * @apiParam {String} treinador Pokemon trainer.
         * 
         * @apiSuccess {Number} pokemons.id Pokemon unique ID.
         * @apiSuccess {String} pokemons.tipo Pokemon type.
         * @apiSuccess {String} pokemons.treinador Pokemon trainer.
         * @apiSuccess {Number} pokemons.nivel Pokemon level.
         * 
         * @apiSuccessExample {json} Success-Response:
         *  HTTP/1.1 200 OK
         *  {
         *      "id": 1,
         *      "tipo": "mewtwo",
         *      "treinador": "Marcos",
         *      "nivel": 1
         *  }
         * 
         *  @apiError InvalidType The type of pokemon is invalid.
         * 
         *  @apiErrorExample Error-Response:
         *   HTTP/1.1 422 Unprocessable Entity
         *   {
         *       "status": "422",
         *       "message": "Tipo inválido. Disponíveis: charizard, mewtwo, pikachu."
         *   }
         */
        .post(pokemon.create.bind(pokemon));

    router
        .route('/pokemons/:id')

        /**
         * @api {get} /pokemons/:id Pokemon information
         * @apiName GetPokemon
         * @apiGroup Pokemon
         *
         * @apiParam {Number} id Pokemon unique ID.
         * 
         * @apiSuccess {Number} pokemons.id Pokemon unique ID.
         * @apiSuccess {String} pokemons.tipo Pokemon type.
         * @apiSuccess {String} pokemons.treinador Pokemon trainer.
         * @apiSuccess {Number} pokemons.nivel Pokemon level.
         * 
         * @apiSuccessExample {json} Success-Response:
         *  HTTP/1.1 200 OK
         *  {
         *      "id": 1,
         *      "tipo": "mewtwo",
         *      "treinador": "Marcos",
         *      "nivel": 2
         *  }
         * 
         * @apiError ResourceNotFound The id of the Pokemon was not found.
         * 
         * @apiErrorExample Error-Response:
         *  HTTP/1.1 404 Not Found
         *  {
         *      "status": "404",
         *      "message": "Resource not found"
         *  }
         */
        .get(pokemon.show.bind(pokemon))

        /**
         * @api {put} /pokemons/:id Pokemon update
         * @apiName UpdatePokemon
         * @apiGroup Pokemon
         *
         * @apiParam {Number} id Pokemon unique ID.
         * 
         * @apiSuccess (204) 204 No Content.
         * 
         * @apiError ResourceNotFound The id of the Pokemon was not found.
         * 
         * @apiErrorExample Error-Response:
         *  HTTP/1.1 404 Not Found
         *  {
         *      "status": "404",
         *      "message": "Resource not found"
         *  }
         */
        .put(pokemon.update.bind(pokemon))

        /**
         * @api {delete} /pokemons/:id Pokemon delete
         * @apiName DeletePokemon
         * @apiGroup Pokemon
         *
         * @apiParam {Number} id Pokemon unique ID.
         * 
         * @apiSuccess (204) 204 No Content.
         * 
         * @apiError ResourceNotFound The id of the Pokemon was not found.
         * 
         * @apiErrorExample Error-Response:
         *  HTTP/1.1 404 Not Found
         *  {
         *      "status": "404",
         *      "message": "Resource not found"
         *  }
         */
        .delete(pokemon.destroy.bind(pokemon));
};

module.exports = Router;


