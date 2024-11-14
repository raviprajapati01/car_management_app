const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

exports.dbconnection = () => {
    const PORT = process.env.PORT || 3001;
    mongoose.connect(process.env.MONGO_URL || "mongodb+srv://raviprajapatikandari:NCTcGgh0IjUGHsiO@cluster0.s0qkx.mongodb.net/Car_Management?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
        console.log(`Server Start successfully port no : ${PORT}`);
        })
        .catch((err) => console.log(`${err} did not connect`));
}
