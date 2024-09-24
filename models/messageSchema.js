const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderName : {
        type : String,
        required : true,
        minlength : [2,"Name must contain at least 2 charactor"],
    },
    subject : {
        type : String,
        minlength : [2,"Subject must contain at least 2 charactor"],
    },
    message : {
        type : String,
        minlength : [2,"Subject must contain at least 2 charactor"],
    },
    createdAt :{
        type : Date,
        default : Date.now()
    }
})

const Message = new mongoose.model('Message',messageSchema);
module.exports = Message;