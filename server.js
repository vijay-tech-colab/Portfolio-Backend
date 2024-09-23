const app = require('./app');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY
})

const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`server running on ${PORT} port..`)
})