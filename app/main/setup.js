'use strict';

const config = require('config');
const fs = require('fs-extra');
const path = require('path');
const read = require('fs-readdir-recursive');
const Sequelize = require('sequelize');

module.exports = {
    setupDatabase: setupDatabase
};

// Functions

function setupDatabase() {
    const databaseConfig = config.get('database');

    let db = {};
    let database = databaseConfig.database;
    let username = databaseConfig.username;
    let password = databaseConfig.password;

    const sequelize = new Sequelize(database, username, password, {
        host: databaseConfig.host,
        dialect: databaseConfig.dialect,
        pool: databaseConfig.pool,
        define: {
            underscored: true
        },
        dialectOptions: {
            charset: 'utf8mb4',
            encrypt: true
        },
        typeValidation: true
    });

    return new Promise((resolve, reject) => {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection with ' + database + '@' + databaseConfig.host + ' has been established and configured successfully.');

                let apiPath = path.resolve('./app/api');

                read(apiPath)
                    .filter(file => {
                        return file.endsWith('_model.js') && !file.endsWith('battle_model.js');
                    })
                    .forEach(file => {
                        let model = sequelize.import(path.join(apiPath, file));
                        db[model.name] = model;
                    });

                Object.keys(db).forEach(function(modelName) {
                    if ('associate' in db[modelName]) {
                        db[modelName].associate(db);
                    }
                });

                db.sequelize = sequelize;
                db.Sequelize = Sequelize;

                resolve(db);
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                reject(err);
            });
    });
}
