
var express = require('express');
var router = express.Router();
var userRoutes = require('./publicRoutes');
//var config = require('../config/main');

/*
 * Routes that can be accessed by any one
 */
router.use("/", publicRoutes);




/*
 * Routes that can be accessed only by autheticated users
 */ 

//router.use('/api/'+config.version+'/prodowner', products.getAll);
/*
* Routes that can be accessed only by authenticated & authorized users

router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
*/
module.exports = router;
