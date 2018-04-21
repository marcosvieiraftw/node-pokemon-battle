'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('pokemons', {
            Id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Tipo: Sequelize.STRING,
            Treinador: Sequelize.STRING,
            Nivel: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            }
        }, {});
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('pokemons');
    }
};
