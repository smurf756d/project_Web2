const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const {
    handleGoogleUser,
    handleFacebookUser,
} = require("../services/authService");

/**
 * Passport configuration.
 * Passport is used only for OAuth redirect flow.
 * After OAuth succeeds, our app generates its own JWT.
 */

passport.serializeUser((user, done) => {
    done(null, user.id || user._id);
});

passport.deserializeUser((id, done) => {
    done(null, { id });
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== "your_google_client_id") {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await handleGoogleUser(profile);
                    done(null, user);
                } catch (error) {
                    done(error, null);
                }
            }
        )
    );
}

if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_ID !== "your_facebook_app_id") {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: process.env.FACEBOOK_CALLBACK_URL,
                profileFields: ["id", "displayName", "emails", "photos"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await handleFacebookUser(profile);
                    done(null, user);
                } catch (error) {
                    done(error, null);
                }
            }
        )
    );
}

module.exports = passport;