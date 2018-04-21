'use strict';

let bodyParser = require('body-parser');
let compress = require('compression');
let config = require('config');
let cors = require('cors');
let fileUpload = require('express-fileupload');
let middle = require('./middleware');
let morgan = require('morgan');

let serverConfig = config.get('server');
let port = process.env.PORT || serverConfig.port;

let Config = {};

console.log('Config file: config/' + config.get('_configFile'));

Config.configure = function(app, express, routers) {
    app.set('host', serverConfig.host);
    app.set('port', port);
    app.set('base url', 'http://localhost');
    app.use(compress());
    app.use(cors());
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(morgan('dev'));
    app.use(fileUpload());

    app.use('/v1', routers.v1);
    app.use('/', routers.v1);
    app.use(middle.throw404);

    app.use(middle.logError);
    app.use(middle.handleError);
};

module.exports = Config;
