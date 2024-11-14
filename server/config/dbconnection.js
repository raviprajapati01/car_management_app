const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

exports.dbconnection = () => {
    const PORT = process.env.PORT || 3001;
    const MONGO_URL = process.env.MONGO_URL;
    mongoose.connect("mongodb+srv://raviprajapatikandari:NCTcGgh0IjUGHsiO@cluster0.s0qkx.mongodb.net/Car_Management?retryWrites=true&w=majority&appName=Cluster0" || MONGO_URL)
        .then(() => {
        console.log(`Server Start successfully port no : ${PORT}`);
        })
        .catch((err) => console.log(`${err} did not connect`));
}
