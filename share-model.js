const mongoose = require('mongoose')
const Schema = mongoose.Schema
//test
const ShareSchema = new Schema(
  {
    id: Number,
    user_id: Number,
    title: String,
    description: String,
    image: String,
    timestamp: String,
  },
  { 
    timestamps: true,
    toJSON: {virtuals: true}
  }
)

ShareSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: 'id',
  justOne: true
})

module.exports = mongoose.model('Share', ShareSchema)