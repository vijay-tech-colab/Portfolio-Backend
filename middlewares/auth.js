const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const { ErrorHandler } = require("./error");


const isAuthenticated = catchAsyncErrors(async (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User not Athenticated",400));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
})
module.exports = isAuthenticated;