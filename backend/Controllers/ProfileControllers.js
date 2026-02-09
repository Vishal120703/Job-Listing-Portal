const User = require("../models/authModel")
const profile = require("../models/profileModel")
const { uploadOnCloudinary } = require("../Utils/Cloudinary");
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const basicDetails = await User.findById(userId).select("-password");

    const otherDetails = await profile.findOne({ user: userId });

    return res.status(200).json({
      basicDetails,
      otherDetails,
    });

  } catch (error) {
    return res.status(500).json({
      msg: "Not able to find Profile",
    });
  }
};

exports.putProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let profileImageUrl;
    let resumeUrl;

    // 1️⃣ Upload profile image if exists
    if (req.files?.profileImage) {
      const localPath = req.files.profileImage[0].path;
      const uploadedImage = await uploadOnCloudinary(localPath);

      if (uploadedImage) {
        profileImageUrl = uploadedImage.secure_url;
      }
    }

    // 2️⃣ Upload resume if exists
    if (req.files?.resume) {
      const localPath = req.files.resume[0].path;
      const uploadedResume = await uploadOnCloudinary(localPath);

      if (uploadedResume) {
        resumeUrl = uploadedResume.secure_url;
      }
    }

    // 3️⃣ Prepare update object
    const updateData = {
      ...req.body,
    };

    if (profileImageUrl) updateData.profileImage = profileImageUrl;
    if (resumeUrl) updateData.resume = resumeUrl;

    // 4️⃣ Update profile
    const updatedProfile = await profile.findOneAndUpdate(
      { user: userId },
      updateData,
      { new: true, upsert: true }
    );

    res.status(200).json(updatedProfile);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating profile",
    });
  }
};