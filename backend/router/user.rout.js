const router = require('express').Router();
const {demo,register,login,isVarify} = require('../controller/user.controller')
const authenticate = require('../middleware/authenticate')

router.route('/demo').get(demo)
router.route('/register').post(register)
router.route('/login').post(login)
// authenticate is a middleware after middleware execution isVarify run
router.route('/isVarify').get(authenticate,isVarify)

module.exports = router