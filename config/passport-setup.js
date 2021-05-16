const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");


passport.serializeUser((user,done)=>{
   done(null,user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  // console.log(user);
  done(null, user);
});


passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },

    async (accessToken, refreshToken, profile, email, done) => {
      const user = await User.findOne({ email: email._json.email });
      if (user) {
        // console.log("existing user " + user);
        return done(null, user);
        
      } else {
        const newuser = new User({
          email: email._json.email,
          name: email._json.name,
          pasword: "",
        });
        await newuser.save();
        // console.log(newuser);
        done(null, newuser);
      }
    }
  )
);
