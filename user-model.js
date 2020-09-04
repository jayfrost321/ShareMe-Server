const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    id: Number,
    name: String,
    password: String,
    email: String,
    profile_picture: String,
    timestamp: String,
  },
  { 
    timestamps: true 
  }

)



module.exports = mongoose.model('User', UserSchema)