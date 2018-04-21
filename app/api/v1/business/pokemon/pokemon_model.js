'use strict';

const Model = function(sequelize, DataTypes) {

    const Pokemon = sequelize.define('Pokemon', {
        tipo: {
            type: DataTypes.ENUM('charizard', 'mewtwo', 'pikachu'),
            field: 'Tipo',
            validate: {
                isIn: {
                    args: [['charizard', 'mewtwo', 'pikachu']],
                    msg: 'Tipo inválido. Disponíveis: charizard, mewtwo, pikachu.' 
                }
            }
        },
        treinador: {
            type: DataTypes.STRING,
            field: 'Treinador'
        },
        nivel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            field: 'Nivel'
        }
    }, {
        schema: 'MARCOS',
        tableName: 'Pokemons',
        freezeTableName: true,
        timestamps: false
    });

    return Pokemon;
};

module.exports = Model;
