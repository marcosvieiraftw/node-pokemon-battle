let path = require('path');

module.exports = {
    'config': path.resolve('config', 'database.js'),
    'env': 'current',
    'migrations-path': path.resolve('db', 'migrations'),
    'seeders-path': path.resolve('db', 'seeders')
};