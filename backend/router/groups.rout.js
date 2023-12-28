const express = require('express');
const router =express.Router();
const {demo,createGroup, allGroups,joinGroup,allJoinAndCreated}=require("../controller/groups.controller");
const authenticate = require('../middleware/authenticate')
const  headerAuth  = require('../middleware/headerAuth')


router.route('/demo').post(demo)
router.route('/create').post(authenticate,createGroup)
router.route('/allCreated').get(allGroups)
router.route('/join').post(authenticate,joinGroup)
router.route('/all').get(authenticate,allJoinAndCreated)

module.exports=router