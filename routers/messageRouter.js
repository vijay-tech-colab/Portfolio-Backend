const express = require('express');
const { sendMessage, getAllMessages, deleteMessage } = require('../controllers/messagesController');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();
router.post('/send',sendMessage);
router.get('/getall',isAuthenticated,getAllMessages);
router.delete('/deletemessage/:id',isAuthenticated,deleteMessage);
module.exports = router
