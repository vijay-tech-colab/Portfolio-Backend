const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const { ErrorHandler } = require("../middlewares/error");
const User = require("../models/userSchema");
const { generateToken } = require("../utils/generateToken");
const cloudinary = require('cloudinary').v2;


exports.register = catchAsyncErrors(async (req, res, next) => {
 
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Avatar and resume are required !"));
    }

    const { avatar, resume } = req.files;
    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(avatar.tempFilePath, {
        folder: "AVATARS"
    });

    if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
        console.error("Cloudinary Error", cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error")
    }

    const cloudinaryResponseForResume = await cloudinary.uploader.upload(resume.tempFilePath, {
        folder: "RESUME"
    });

    if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
        console.error("Cloudinary Error", cloudinaryResponseForResume.error || "Unknown Cloudinary Error")
    }
    
    const {
        fullname,
        email,
        phone,
        aboutMe,
        password,
        portfolioUrl,
        githubUrl,
        instagramURl,
        facebookURl,
        twitterURl,
        linkedInURl
    } = req.body;
    
    const isEmailExits = await User.findOne({email});
    if(isEmailExits)
        return next(new ErrorHandler("Dublicate email",400))
    const user = await User.create({
        fullname,
        email,
        phone,
        aboutMe,
        password,
        githubUrl,
        portfolioUrl,
        instagramURl,
        facebookURl,
        twitterURl,
        linkedInURl,
        avatar : {
            public_id : cloudinaryResponseForAvatar.public_id,
            url : cloudinaryResponseForAvatar.secure_url
        },
        resume : {
            public_id : cloudinaryResponseForResume.public_id,
            url : cloudinaryResponseForResume.secure_url
        }
    });

    generateToken(user,"User Register",201,res);
});

exports.login = catchAsyncErrors(async (req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Email and Password are required ?"));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password "));
    }
    const isMatchPassword = await user.comparePassword(password);
    if(!isMatchPassword){
        return next(new ErrorHandler("Invalid Email or Password "));
    }
    generateToken(user,"Login successfully",200,res);
});
