const express = require('express');
const router =express.Router();
const {demo,createGroup, allGroups,joinGroup,allJoinAndCreated, updateGroup, deleteGroup}=require("../controller/groups.controller");
const authenticate = require('../middleware/authenticate')
const  headerAuth  = require('../middleware/headerAuth')


router.route('/demo').post(demo)
router.route('/create').post(authenticate,createGroup)
router.route('/allCreated').get(allGroups)
router.route('/join').post(authenticate,joinGroup)
router.route('/all').get(authenticate,allJoinAndCreated)
router.route('/update/:id').put(updateGroup)
router.route('/delete/:id').put(deleteGroup)

module.exports=router