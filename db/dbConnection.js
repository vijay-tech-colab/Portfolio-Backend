const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName : "PORTFOLIO"
        });
        console.log('database connection successfully');
    } catch (error) {
        console.log(`database :`,error);
    }
}

module.exports = dbConnection;