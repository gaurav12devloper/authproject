import passport from 'passport';
import User from './models/User.js';
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
dotenv.config();

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                new User({
                    facebookId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);

passport.serializeUser((user, done) => { 
    done(null, user.id);
});

passport.deserializeUser((id, done) => { 
    User.findById(id).then((user) => {
        done(null, user);
    });
});

export default passport;