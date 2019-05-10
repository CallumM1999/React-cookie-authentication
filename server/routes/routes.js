const express = require('express');
const router = express.Router();

const con = require('../db/connection');

// Middleware
const isLoggedIn = require('../middleware/isLoggedIn');

router.post('/register', (req, res) => {
    console.log('register request');



    const { email, password, username } = req.body;


    console.log(req.body);




    if (!email || !password || !username) {
        return res.status(400).send();
    } else {
        const query = `INSERT INTO user (username, email, password) VALUES ('${username}','${email}','${password}');`;

        con.query(query, (err, queryResponse) => {
            if (err) return res.status(500).send();

            req.login({
                email,
                username
            }, err => {
                if (err) res.status(500).send();

                req.session.user = req.user;

                console.log({ queryResponse })
                res.status(200).send();
            })


            
        })
        
    }

})


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send();

    const query = `SELECT password FROM user WHERE email = '${email}';`;

    con.query(query, (err, queryResponse) => {
        if (err) return res.status(401).send();

        if (queryResponse.length === 0) return res.status(401).send();

        const passwordHash = queryResponse[0].password;

        if (passwordHash !== password) return res.status(401).send();

        req.login({ username: email }, function (err) {
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

    return req.app.render(req, res, req.url, { name: req.session.user.username})
});

router.get('*', (req, res) => {
    return req.app.render(req, res, req.url, {})
});

module.exports = router;