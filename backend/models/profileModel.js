const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  user: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String, // store image URL
  },

  resume: {
    type: String, // store resume URL
  },

  bio: {
    type: String,
  },

  skills: [{
    type: String,
  }],

  experience: {
    type: Number, // years
  },

  location: {
    type: String,
  },

  companyName: {
    type: String, // only for employer
  },

  website: {
    type: String,
  }

}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
