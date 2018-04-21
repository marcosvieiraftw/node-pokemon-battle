'use strict';

let express = require('express');
let app = express();
let routers = {};
let config = require('./config');
let setup = require('./setup');

routers.v1 = express.Router();

config.configure(app, express, routers);


setup.setupDatabase().then(db => {
    /* generate inject routes */
    require('../api/v1/business/pokemon/pokemon_routes.js')(routers.v1, db);
    require('../api/v1/business/battle/battle_routes.js')(routers.v1, db);
    app.emit("dataBaseLoaded");
    
});


module.exports = app;
