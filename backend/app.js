const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const { connectDB } = require("./config/db");
connectDB();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const AuthRoutes = require("./routes/authRouter");
const ProfileRouter = require("./routes/profileRouter")
app.use("/api/User", AuthRoutes);
app.use("/api/User", ProfileRouter);

app.listen(port, () => {
    console.log("the Server is running on port");
});


