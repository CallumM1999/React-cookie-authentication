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
// 
// app.use(express.cookieParser());
// app.use(express.bodyParser());
const session = require('express-session')

app.use(session({
    key: 'session_cookie_name',
    secret: 'some_secret_key',
    rolling: true,
    
}))

app.use(passport.initialize());
app.use(passport.session());

// app.use(passport.initialize());

passport.use(new CookieStrategy(
    function(token, done) {
        return done(null, {
            username: 'callumm1999',
            fname: 'callum',
            email: 'callummac@protonmail.com'
        })   
    }
));

passport.use(new localStrategy(
    function(token, done) {
        return done(null, {
            username: 'callumm1999',
            fname: 'callum',
            email: 'callummac@protonmail.com'
        })
    }
));

app.use((req, res, next) => {
    console.log('==========')
    console.log(req.path);
    next();
});

app.post('/login', (req, res) => {

    req.logIn({
        username: 'callumm1999'
    }, function(err) {
        res.send('ye')
    })
    
})


app.get('/profile', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    // res.redirect('/login')

    res.sendFile(path.resolve(publicPath, 'profile', 'index.html'))
})

app.use(express.static(publicPath))


app.post('/isAuthenticated', (req, res) => {
    console.log('is Authenticated??');


    res.json({
        authenticated: true
    });
})

app.listen(PORT, () => console.log(`${__filename} is running on http://localhost:${PORT}`));