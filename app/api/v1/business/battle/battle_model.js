'use strict';

class BattleModel {
    constructor(pokemonModel) {
        this.pokemonModel = pokemonModel;
    }

    battle(req) {
        return this._getPokemons([req.pokemonAId, req.pokemonBId]).then(pkms => {
            let battleResults = this._doBattle(pkms[0], pkms[1]);
            let prettyFormat = {};
            for (let i in battleResults) {
                if (battleResults[i].status === 'w') {
                    delete battleResults[i].status;
                    prettyFormat.vencedor = battleResults[i];
                    continue;
                }

                delete battleResults[i].status;
                prettyFormat.perdedor = battleResults[i];
            }
            
            return prettyFormat;
        });
    }

    _getPokemons(pkmIds) {
        return this.pokemonModel.findAll({
            where: 
                { id: 
                    { in: pkmIds } 
                }, 
            raw: true
        }).then(pkms => {
            if (pkms.length < 2) {
                throw new Error('Pokemons com nivel 0 são apagados, portanto, escolha outra combinação de IDs para o duelo.');
            };

            return pkms;
        });
    }

    _doBattle(pokemonA, pokemonB) {
        let pokemons = this._getPercentage(pokemonA, pokemonB);
        let objToCalculate = {};
        for (let i in pokemons) {
            objToCalculate[pokemons[i].id] = pokemons[i].chance;
        }

        let idWinner = this._calculateWinner(objToCalculate);
        pokemons[idWinner].status = 'w';

        for (let x in pokemons) {
            delete pokemons[x].chance;
            if (pokemons[x].status === 'w') {
                pokemons[x].nivel += 1;
                continue;
            }

            pokemons[x].status = 'l';
            pokemons[x].nivel -= 1;
        }

        this._persistResults(pokemons);
        return pokemons;
    }

    _persistResults(pokemons) {
        for (let z in pokemons) {
            if (pokemons[z].nivel < 1) {
                this.pokemonModel.destroy({
                    where: { id: pokemons[z].id }
                });
                continue;
            }

            this.pokemonModel.update(pokemons[z], {
                where: { id: pokemons[z].id },
                fields: ['nivel']
            });
        }
    }

    _getPercentage(pokeA, pokeB) {
        let idAndData = {};
        let total = pokeA.nivel + pokeB.nivel;
        let fct = 1 / total;
        pokeA.chance = pokeA.nivel * fct;
        pokeB.chance = pokeB.nivel * fct;

        idAndData[pokeA.id] = pokeA;
        idAndData[pokeB.id] = pokeB;
        return idAndData;
    }

    _calculateWinner(pokes) {
        let sum = 0;
        let rand = Math.random();
        for (let i in pokes) {
            sum += pokes[i];
            if (rand <= sum) {
                return i;
            }
        }
    }
}

module.exports = BattleModel;
