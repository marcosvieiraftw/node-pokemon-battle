'use strict';

let app = require('./app/main/app');
let port = app.get('port');
let host = app.get('host');
let server = require('http').Server(app);

let log = 'Listening on ' + app.get('base url') + ':' + port;

server.listen(port, host, () => {
    console.log('App has started');
});
console.log(log);
