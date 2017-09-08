var express = require('express');
var config = require('./config');
var app = express();
const ENV = process.env.NODE_ENV || 'development';

app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);

require('./config/initializers/logger').init(app);
require('./config/initializers/passport').init(app);
require('./config/initializers/express').init(app);
require('./config/initializers/routes').init(app);
require('./config/initializers/error').init(app);

module.exports = app;
