const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT||5000;

const { connectDB } = require("./config/db");
connectDB();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const AuthRoutes = require("./routes/authRouter");
const ProfileRouter = require("./routes/profileRouter")
const JobsRouter = require("./routes/jobsRouter")
const ApplyRouter = require("./routes/applyRouter")
app.use("/api/User", AuthRoutes);
app.use("/api/User", ProfileRouter);
app.use("/api/User",JobsRouter);
app.use("/api/User",ApplyRouter);

app.listen(port, () => {
    console.log("the Server is running on port");
});



