const router = require('express').Router();
const {demo,register,login} = require('../controller/user.controller')

router.route('/demo').get(demo)
router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router