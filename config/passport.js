const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users')

module.exports = () => {
   // Allowing passport to serialize and deserialize users into sessions
 passport.serializeUser((user, cb) => cb(null, user))
 passport.deserializeUser((obj, cb) => cb(null, obj))

 // The function that is called when an OAuth provider sends back user
 // information.  Normally, you would save the user to the database here
 // in a callback that was customized for each provider.
 const callback = (accessToken, refreshToken, profile, cb) => {
     console.log(profile)
    User.findOne({'googleId': profile.id}, (err, user) => {
       if(err) cb(err)
       if(user) {
         return cb(null, user)
       } else {
          const newUser = new User({
             username: profile.displayName,
             email: profile.emails[0].value,
             googleId: profile.id
          })
          newUser.save(err => {
             if(err) return cb(err)
             newUser.created = true
             return cb(null, newUser)
          })
       }
    }) 
    // You would see if the user is in the database and if he is return user
    // else create user and then return that
 }

   

 // Adding each OAuth provider’s strategy to passport
//  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback))
 passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
 }, callback))
//  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
//  passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
}

