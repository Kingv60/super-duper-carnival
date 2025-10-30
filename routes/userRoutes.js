const express = require('express');
const router = express.Router();
const { getUserIdByEmail } = require('../controllers/userController');

router.get('/by-email', getUserIdByEmail);

module.exports = router;
