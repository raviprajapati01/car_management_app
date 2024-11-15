const express = require("express");
const app = express();

const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.routes.js")
const listingRoutes = require("./routes/listing.routes.js")
const bookingRoutes = require("./routes/booking.routes.js")
const userRoutes = require("./routes/user.routes.js");
const { dbconnection } = require("./config/dbconnection.js");

const PORT = process.env.PORT||3001;

app.use(cors({
  origin: "*", // Replace with your frontend URL if different
  methods: ["GET", "POST", "PATCH", "DELETE"], // Specify allowed methods
}));
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

/* MONGOOSE SETUP */

dbconnection();

// get request
app.get('/', (req, res)=>[
  res.send('Hello This is a Car Management application')
])

app.listen(PORT , ()=>{
  console.log(`Server is running on port ${PORT}`)
})
