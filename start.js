'use strict';

const app = require('./app');

const isInDev = (process.env.dev) ? true : false;
const applicationPort = process.env.port || 3000;

//console.log(applicationPort, isInDev);

app.listen(applicationPort, () => {
    if (isInDev) console.log('Server started on port', applicationPort);
});