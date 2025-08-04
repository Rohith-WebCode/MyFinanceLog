const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profilePic: {
  type: String,
  default: "https://res.cloudinary.com/dgrxeqayx/image/upload/v1754314800/12225935_ul55vr.png",
}
})

module.exports = mongoose.model('User',userSchema)