const {register, login, loguot} = require('../controllers/userController');
const express = require('express');
const router = express.Router();
router.post('/register',register);
router.post('/login',login);
router.post('/logout',loguot);
module.exports = router;