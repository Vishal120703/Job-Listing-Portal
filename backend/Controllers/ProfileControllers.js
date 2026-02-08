const User = require("../models/authModel")
const profile = require("../models/profileModel")
exports.getProfile= async(req,res)=>{
    try{
    const userId = req.user.id;
    const basicDetails = await User.findById(userId);
    const userName = basicDetails.username;
    const otherDetails = await profile.findOne({user:userName});
    return res.status(200).json({basicDetails,otherDetails});
    }
    catch{
        return res.status(500).json({msg:"Not able to find Profile"});
    }
}

exports.putProfile=async(req,res)=>{
    try {
    const { username } = req.params;

    const updatedProfile = await profile.findOneAndUpdate(
      { username: username },
      req.body,
      { new: true }
    );

    res.json(updatedProfile);

  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }

    
}