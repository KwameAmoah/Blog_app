const passport = require("passport")

const JWTStratergy = require("passport-jwt").Strategy
const ExtractJWT= require("passport-jwt").ExtractJwt

passport.use("jwt", new JWTStratergy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}, (payload, done) => {
    try {
    done(null, payload.user);
} catch (error) {
    done(error);
    }
}
));