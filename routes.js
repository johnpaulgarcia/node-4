const router = require('express').Router();
const UserController = require('./controllers/UserController');

const def = (req,res,next) => {
 	res.send('API RUNNING');
 }

router.route('/').get(def);
router.route('/register').post(UserController.register);
router.route('/protected/data').get(UserController.getUser);
router.route('/login').post(UserController.login);

module.exports = router;
