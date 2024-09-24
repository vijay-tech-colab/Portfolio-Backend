const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const { ErrorHandler } = require("../middlewares/error");
const Message = require("../models/messageSchema");

exports.sendMessage = catchAsyncErrors(async (req,res,next) =>{
    const {senderName ,message , subject} = req.body;
    if(!senderName || !message || !subject){
        return next(new ErrorHandler('Please fill full form ?',400));
    }
    const data = await Message.create({senderName ,message , subject});
    res.status(201).json({
        success : true,
        message : "Message sent",
        data
    })
});

exports.getAllMessages = catchAsyncErrors(async (req,res,next) => {
    const messages = await Message.find();
    res.status(200).json({
        success : true,
        messages
    });
});

exports.deleteMessage = catchAsyncErrors(async (req,res,next) => {
    const {id} = req.params;
    console.log(req.params)
    const message = await Message.findByIdAndDelete({_id : id});
    if(!message)
        return next(new ErrorHandler("Message already deleted",400));
    res.status(200).json({
        success : true,
        message : "deleted"
    });
})