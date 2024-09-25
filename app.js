const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dbConnection = require('./db/dbConnection');
const { errorMiddleWare } = require('./middlewares/error');
const messageRouter = require('./routers/messageRouter');
const userRouter = require('./routers/userRouter');
require('dotenv').config({path : './config/config.env'});

app.use(cors({
    origin : [process.env.DASHBOARD_URL,process.env.PORTFOLIO_URL],
    methods : ['GET','POST','DELETE','PUT','PATCH'],
    credentials : true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
// import all router 
app.use('/api/v1/message',messageRouter);
app.use('/api/v1/user',userRouter)
dbConnection();
app.use(errorMiddleWare);
// export app file 
module.exports = app