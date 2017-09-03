
var express = require('express');
var router = express.Router();
var publicRoutes = require('./publicRoutes');
var errorRoutes = require('./errorRoutes');
var config = require('../../config');

/*
 * Routes that can be accessed by any one
 */
router.use("/", publicRoutes);


router.use('/api/'+config.get("app:version")+'/test', errorRoutes);

/* Routes that can be accessed only by authenticated & authorized users

router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
*/
module.exports = router;
