const express = require('express');
const app = express();
const PORT = 4000;

const path = require('path');

const publicPath = path.resolve(__dirname, 'out');

const passport = require('passport');
const CookieStrategy = require('passport-cookie')

const cookieParser = require('cookie-parser');
const localStrategy = require('passport-local');

app.use(cookieParser());

const session = require('express-session')

app.use(session({
    key: 'session_cookie_name',
    secret: 'some_secret_key',
    rolling: true,

}))



passport.use(new localStrategy(
    function(token, done) {

        console.log({ token });

        return done(null, {
            username: 'callumm1999',
            fname: 'callum',
            email: 'callummac@protonmail.com'
        })
    }
));

passport.serializeUser((user, done) => {
    console.log('serialising user', user)
    done(null, user);
})

passport.deserializeUser((id, done) => {

    console.log('Deserialize')
    // find user

    // const query = `SELECT id FROM user WHERE id = '${id}'`;

    // con.query(query, (error, user) => {
    //     if (error) console.log('error', error);
    //     done(null, id);
    // })

    done(null, '123abc')
});

function isLoggedIn(req, res, next) {
    console.log('Is Logged', req.session)
    if (req.session.user !== undefined) {
        console.log('LOGIN VALID')
        next();
    } else {
        console.log('not logged in')
        res.redirect("/login");
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log('==========')
    console.log(req.path);
    next();
});

app.post('/login', (req, res) => {
    console.log('post login')
    req.login({ username: 'callumm1999' }, function(err) {
        if (err) {
            console.log('ERRROR LOGGIN IN', err)

            return res.status(401).send();
        }

        req.session.user = req.user;

        res.status(200).json({
            success: true
        })
    })

})


app.get('/profile', isLoggedIn, (req, res) => {
    res.sendFile(path.resolve(publicPath, 'profile', 'index.html'))
})

app.get('/logout', (req, res) => {
    console.log('LOG OUT!')
    // req.logout();
    req.session.destroy();

    console.log('user', req.user, req.session)
    res.redirect('/')
})

app.use(express.static(publicPath))


app.post('/isAuthenticated', (req, res) => {
    console.log('is Authenticated??');


    res.json({
        authenticated: true
    });
})

app.listen(PORT, () => console.log(`${__filename} is running on http://localhost:${PORT}`));