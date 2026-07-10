const mongoose  = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB is connected");
        
    } catch (error) {
        console.log("MongoDB connection is failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;