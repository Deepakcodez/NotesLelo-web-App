const express = require('express');
const router = express.Router(); // Change from `express()` to `express.Router()`
const multer = require('multer');
const path = require('path');

const notesController = require('../controller/notes.controller');
const authenticate = require('../middleware/authenticate');

// Middleware order correction
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, 'public')));

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 100000000 }
});

// Route to handle file upload
router.post('/upload-file', uploader.single('pdf'), authenticate, notesController.uploadFile);

router.get('/groupNotes/:groupId', authenticate, notesController.groupNotes);
router.put('/groupNotes/addLike/:notesId', authenticate, notesController.addLikeOrDislike);
router.post('/groupNotes/saveNotes', authenticate, notesController.savedNotes);
router.get('/savedNotes', authenticate, notesController.UserSavedNotes);
router.get('/your-notes', authenticate, notesController.userNotes);

module.exports = router;
