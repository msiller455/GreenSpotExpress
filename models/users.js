const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    googleId: String,
    vendor: Boolean,
    vendorName: String,
    location: String,
    bio: String,
    image: String,
    schedule: [String],
    category: String,
    phone: Number,
    website: String,
    googleId: String
})

const User = mongoose.model('User', userSchema)

module.exports = User