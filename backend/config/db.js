const mongoose = require("mongoose")
const mongo = process.env.MONGODB

const connectDB = async()=>{
    try{
        await mongoose.connect(mongo);
        console.log("connected");
    }
    catch{
       console.log("Not able to connect");
    }

}

module.exports = {connectDB}