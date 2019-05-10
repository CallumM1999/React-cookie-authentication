const passport = require('passport');
const localStrategy = require('passport-local');

const configurePassport = () => {

    passport.use(new localStrategy(
        function (token, done) {

            return done(null, {
                username: 'callumm1999',
                fname: 'callum',
                email: 'callummac@protonmail.com'
            })
        }
    ));

    passport.serializeUser((user, done) => {
        // console.log('serialising user', user)
        done(null, user); // store only id
    })

    passport.deserializeUser((id, done) => {
        // console.log('Deserialize', id)
        // find user
        // null is err
        // get user data from stored id
        done(null, {
            username: 'callumm1999',
            fname: 'callum',
            email: 'callummac@protonmail.com'
        })
    });
};

module.exports = configurePassport;