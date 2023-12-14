const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [5, 'Username must be atleast 5 characters long'],
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: String,
  totalFavorites: {
    type: Number,
    default: 0
  },
  collection: [
    {
      tmdbId: 
      {
        type: Number,
        addedAt: { type: Date, default: Date.now }
      }
    }
  ]
})
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)