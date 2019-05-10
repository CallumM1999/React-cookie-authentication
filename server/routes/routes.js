const express = require('express');
const router = express.Router();

// Middleware
const isLoggedIn = require('../middleware/isLoggedIn');


router.post('/login', (req, res) => {
    req.login({ username: 'callumm1999' }, function (err) {
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


router.get('/logout', (req, res) => {
    console.log('LOG OUT!')
    req.session.destroy(function(err) {
        if (err) console.error(err);

        req.logout();
        

        console.log('user', req.user, req.session)
        res.redirect('/')
    });

    
})

router.get('/profile', isLoggedIn, (req, res) => {
    return req.app.render(req, res, req.url, { name: 'callum'})
});

router.get('*', (req, res) => {
    return req.app.render(req, res, req.url, {})
});

module.exports = router;