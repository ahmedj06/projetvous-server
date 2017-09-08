'use strict';
const logger = require('morgan');

module.exports.init = initLogger;

function initLogger(app) {

    app.use(logger('dev'));
  //app.use('/api', require(routesPath + '/users'));
};
