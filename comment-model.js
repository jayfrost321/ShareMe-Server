const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    id: Number,
    user_id: Number,
    share_id: Number,
    Comment: String,
    timestamp: String,
  },
  { 
    timestamps: true 
  }
)

CommentSchema.virtual('share', {
  ref: 'Share',
  localField: 'share_id',
  foreignField: 'id',
  justOne: true
})

CommentSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: 'id',
  justOne: true
})

module.exports = mongoose.model('Comment', CommentSchema)