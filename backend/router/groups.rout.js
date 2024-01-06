const express = require('express');
const router =express.Router();
const {demo,createGroup, allGroups,joinGroup,allJoinAndCreated, updateGroup, deleteGroup,groupById}=require("../controller/groups.controller");
const authenticate = require('../middleware/authenticate')


router.route('/demo').post(demo)
router.route('/create').post(authenticate,createGroup)
router.route('/allCreated').get(allGroups)
router.route('/join').post(authenticate,joinGroup)
router.route('/all').get(authenticate,allJoinAndCreated)
router.route('/:id').get(authenticate,groupById)
router.route('/update/:id').put(authenticate,updateGroup)
router.route('/delete/:id').delete(authenticate,deleteGroup)

module.exports=router