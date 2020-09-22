const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    id: Number,
    user_id: Number,
    share_id: Number,
    comment: String,
    timestamp: String,
  },
  { 
    timestamps: true, 
    toJSON: {virtuals: true}
  }
)

module.exports = mongoose.model('Comment', CommentSchema)