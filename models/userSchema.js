const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : [true, "Name Required ?"]
    },
    email : {
        type : String,
        required : [true, "Email is Required ?"]
    },
    phone : {
        type : String,
        required : [true, "Phone number is Required ?"]
    },
    aboutMe :{
        type : String,
        required : [true, "Abount me Field is Required ?"]
    },
    password :{
        type : String,
        required : [true, "Password is Required ?"],
        minlength : [8,"Password must contain at least 8 character"],
        select : false
    },
    avatar : {
        public_id : {
            type :String,
            required : true
        },
        url : {
            type :String,
            required : true
        }
    },
    resume : {
        public_id : {
            type :String,
            required : true
        },
        url : {
            type :String,
            required : true
        }
    },
    portfolioUrl : {
        type : String,
        required : [true, "PortFolio URl is required"]
    },
    githubUrl : String,
    instagramURl : String,
    facebookURl : String,
    twitterURl : String,
    linkedInURl : String,
    resetPasswordToken : String,
    resetPasswordExpires : Date
});

//! for hashing password 
userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    try {
       const genSalt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(user.password,genSalt);
       this.password = hashPassword; 
    } catch (error) {
       console.log("password ", error); 
    }
});

//! for comparing password
userSchema.methods.comparePassword = async function (enterPassword){
    const isMatchPassword = await bcrypt.compare(enterPassword,this.password);
    return isMatchPassword;
};

//! for generating json web token 
userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({id : this._id},process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRES
    });
}

const User = new mongoose.model("User",userSchema);
module.exports = User;