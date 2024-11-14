const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

exports.dbconnection = () => {
    const PORT = process.env.PORT || 3001;
    mongoose.connect(process.env.MONGO_URL || "mongodb+srv://raviprajapatikandari:MjpkdMQkSUZSCRcm@cluster0.5denj.mongodb.net/DreamHaven")
        .then(() => {
        console.log(`Server Start successfully port no : ${PORT}`);
        })
        .catch((err) => console.log(`${err} did not connect`));
}