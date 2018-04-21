'use strict';

const fs = require('fs-extra');
const mysql = require('mysql');
const path = require('path');

const databaseConfig = require('config').get('database');

console.log('Environment:' ,  process.env.NODE_ENV);
console.log('Database: ' +
    databaseConfig.database + '@' + databaseConfig.host);

let connection = mysql.createConnection({
    host: databaseConfig.host,
    user: databaseConfig.username,
    password: databaseConfig.password
});

connection.connect();

let table = process.argv[2];
let query = 'SELECT * FROM ' + databaseConfig.database + '.' + table + ';';
let seedPath = path.resolve('./db', 'js');
let fileName = table + '.js';

connection.query(query, function(err, results, fields) {
    if (err) throw err;

    fs.writeFile(path.resolve(seedPath, fileName), JSON.stringify(results), function(err) {
        if (err) throw err;
        console.log('mysql:' + query);
    });

    connection.end();
});
