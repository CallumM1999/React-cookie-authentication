console.log('Starting app.js');

const next = require('next');

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const expressServer = require('./server/expressServer.js');

app.prepare()
    .then(() => {

        // call server
        console.log('Calling server.js');
        expressServer(app);

    })
    .catch(err => {
        console.error(`Server error: ${err.stack}`);
        process.exit(1);
    });
