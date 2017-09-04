'use strict';

module.exports.init = initRoutes;

function initRoutes(app) {

  app.use('/auth', require("../../app/routes/auth"));
  //app.use('/api', require(routesPath + '/users'));
};
