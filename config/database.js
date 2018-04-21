'use strict';

let databaseConfig = require('config').get('database');
let env = process.env.NODE_ENV;

console.log('Environment:' ,  env);
console.log('Database: ' +
    databaseConfig.database + '@' + databaseConfig.host);

if (process.env.NODE_ENV === 'production') {
    console.log('WARNING: Running operation on production database!');
    throw 'Comment this line in config/database.js to continue.';
}

module.exports = {
    current: databaseConfig
};
