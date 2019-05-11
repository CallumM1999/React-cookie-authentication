const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const con = require('../db/connection');

// Middleware
const protectedRoute = require('../middleware/protectedRoute');
const isLoggedIn = require('../middleware/isLoggedIn');

router.post('/register', (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) return res.status(400).send();

    const query = `INSERT INTO user (username, email, password) VALUES ('${username}','${email}','${password}');`;

    con.query(query, (err, queryResponse) => {
        if (err) return res.status(500).send();

        // register successful 
        const user = {
            email, 
            username,
            id: queryResponse.insertId
        };

        const token = jwt.sign(user, process.env.JWT_SECRET);

        res.cookie('jwt', token)
        res.status(200).send();
    })
})


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send();

    const query = `SELECT id, username, password FROM user WHERE email = '${email}';`;

    con.query(query, (err, queryResponse) => {
        if (err) return res.status(401).send();
        if (queryResponse.length === 0) return res.status(401).send();

        const passwordHash = queryResponse[0].password;
        if (passwordHash !== password) return res.status(401).send();

        // login successful 

        const user = {
            email,
            username: queryResponse[0].username,
            id: queryResponse[0].id
        };

        const token = jwt.sign(user, process.env.JWT_SECRET);

        res.cookie('jwt', token);
        res.status(200).send();
    })
})


router.get('/logout', (req, res) => {
    res.cookie('jwt', null);
    res.redirect('/');  
});

router.get('/', isLoggedIn, (req, res) => {
    const auth = !!req.user;
    return req.app.render(req, res, req.url, { auth });
});

router.get('/login', isLoggedIn, (req, res) => {
    const auth = !!req.user;
    return req.app.render(req, res, req.url, { auth });
});

router.get('/register', isLoggedIn, (req, res) => {
    const auth = !!req.user;
    return req.app.render(req, res, req.url, { auth });
});


router.get('/profile', isLoggedIn, protectedRoute, (req, res) => {
    const { username } = req.user;
    const auth = !!req.user;

    return req.app.render(req, res, req.url, { name: username, auth });
});

router.get('*', (req, res) => {
    return req.app.render(req, res, req.url, {})
});

module.exports = router;