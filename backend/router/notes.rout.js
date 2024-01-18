const express = require('express');
const multer = require('multer');
const notesController = require('../controller/notes.controller');
const router = express.Router(); // Change from `express()` to `express.Router()`

const path = require('path');
const bodyParser = require('body-parser');

// Middleware order correction
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, 'public')));

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 100000000 }
});

// Route to handle file upload
router.post('/upload-file', uploader.single('pdf'), notesController.uploadFile);

router.post('/groupNotes',notesController.groupNotes)


module.exports = router;
