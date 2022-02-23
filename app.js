//////////////////////////////////////////
/// Author: Taylor Rainwater 113430036 ///
//////////////////////////////////////////

//imports
const express = require('express');
const path = require('path');
const tweetsHandler = require('./routes/tweets');
const IDsHandler = require('./routes/ids');
const accountHandler = require('./routes/account');

const app = express(); //express object used to initialize the server
const port = 3000 //port 3000 as the adress for the server

app.use('/tweets', tweetsHandler); //use the tweets module as the handler for http://127.0.0.1:3000/tweets/
app.use('/ids', IDsHandler); //use the ids module as the handler for http://127.0.0.1:3000/ids/
app.use('/account', accountHandler); //use the account module as the handler for http://127.0.0.1:3000/account/

app.use((req, res, next) => { //handler for all requests to http://127.0.0.1:3000/
    res.status(200).sendFile(path.join(__dirname, '/index.html')); //send the HTML homepage to the client
});

const server = app.listen(port); //start server listening on port 3000
console.log('server listening on port ' + parseInt(port));

