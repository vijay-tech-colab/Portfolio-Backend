const express = require('express');
const { sendMessage, getAllMessages, deleteMessage } = require('../controllers/messagesController');
const router = express.Router();
router.post('/send',sendMessage);
router.get('/getall',getAllMessages);
router.delete('/deletemessage/:id',deleteMessage);
module.exports = router
