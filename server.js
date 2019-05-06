const express = require('express');
const app = express();
const PORT = 4000;

const path = require('path');

const publicPath = path.resolve(__dirname, 'build');

// console.log(publicPath);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'index.html'))
});

app.get('/profile', (req, res) => {
    // res.sendFile(path.resolve(publicPath, 'index.html'))

    res.redirect('/?yourenot=authenticated')
})

app.use(express.static(publicPath))

// app.get('/', (req, res) => {
//     res.status(200).send('Holla');
// })

app.post('/isAuthenticated', (req, res) => {
    console.log('is Authenticated??');


    res.json({
        authenticated: true
    });
})

app.listen(PORT, () => console.log(`${__filename} is running on http://localhost:${PORT}`));