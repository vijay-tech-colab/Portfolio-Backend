const {register} = require('../controllers/userController');
const express = require('express');
const router = express.Router();
router.post('/register',register);

module.exports = router;