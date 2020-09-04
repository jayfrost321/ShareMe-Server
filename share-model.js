const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShareSchema = new Schema(
  {
    id: Number,
    user_id: Number,
    title: String,
    description: String,
    image: String,
    timestamp: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Share', ShareSchema)