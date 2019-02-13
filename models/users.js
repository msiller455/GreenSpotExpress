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
    coordinates: {lat: Number, lng: Number},
    profilePic: String,
    image: String,
    schedule: [String],
    category: String,
    phone: String,
    website: String,
    googleId: String,
    outTonight: Boolean
})

const User = mongoose.model('User', userSchema)

module.exports = User