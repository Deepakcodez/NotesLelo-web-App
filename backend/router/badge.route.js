const express = require('express');
const router = express.Router();
const { getBadge } = require('../controllers/badgeController');

router.get('/badge/:userId', getBadge);

module.exports = router;
