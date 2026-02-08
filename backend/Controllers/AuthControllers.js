const User = require("../models/authModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.getSignUsers = async(req, res) => {
    res.send("getSignUp")
};

exports.postSignUsers = async(req,res) => {
    try{
        const{username,name,email,password,role} = req.body;
        if(!username ||!name || !email || !password){
            return res.status(400).json({
                message:"All feilds are required"
            })
        }
        const existingEmail = await User.findOne({email})

        if(existingEmail){
            return res.status(400).json({msg:"User Already Exist"})
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username:username,
            name:name,
            email:email,
            password:hashedPassword,
            role:role
        })
        await newUser.save();

        return res.status(201).json({
            msg:"Signup is working",
        });

    } catch(error){
        return res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
};

exports.getLoginUsers = (req,res) => {
    res.send("getLoginUser")
};

exports.postLoginUsers = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const loginUser = await User.findOne({ username });

    if (!loginUser) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: loginUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,       
      secure: false,        // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
