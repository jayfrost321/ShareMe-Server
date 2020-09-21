const mongoose = require('mongoose')
const { stringify } = require('querystring')
const Schema = mongoose.Schema
//test
const UserSchema = new Schema(
  {
    id: Number,
    name: String,
    password: String,
    email: String,
    about_me: String,
    profile_picture: String,
    timestamp: String,
  },
  { 
    timestamps: true,
    toJSON: {virtuals: true}
  }
)

UserSchema.virtual('shares', {
  ref: 'Share',
  localField: 'id',
  foreignField: 'user_id',
  justOne: false
})
module.exports = mongoose.model('User', UserSchema)