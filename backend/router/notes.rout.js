const express = require("express");
const multer = require('multer');
const notes = require('../controller/notes.controller');
const router = express();

const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));
router.use(express.static(path.resolve(__dirname,'public')));


var uploader = multer({
    storage:multer.diskStorage({}),
    limits:{fileSize:100000000}
});

router.post('/upload-file',uploader.single("pdf"),notes.uploadFile);
module.exports=router;

