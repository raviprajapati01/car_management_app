const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

exports.dbconnection = () => {
    const PORT = process.env.PORT || 3001;
    const MONGO_URL = process.env.MONGO_URL;

    // Ensure MONGO_URL is defined
    if (!MONGO_URL) {
        console.error("MONGO_URL is not defined in the environment variables.");
        process.exit(1); // Exit the process if the URL is not provided
    }

    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log(`Database connected successfully.`);
            console.log(`Server can start on port: ${PORT}`);
        })
        .catch((err) => {
            console.error(`Database connection failed: ${err.message}`);
            process.exit(1); // Exit the process if the database connection fails
        });
};
