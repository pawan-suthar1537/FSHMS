const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URL);
        console.log(`databse Connected 😪👍`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
