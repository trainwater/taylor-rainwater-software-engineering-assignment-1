//////////////////////////////////////////
/// Author: Taylor Rainwater 113430036 ///
//////////////////////////////////////////

//imports
const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router(); //router to handle HTTP requests to http://127.0.0.1:3000/ids


router.get('/', (req, res, next) => { //HTTP GET method ised to retrieve IDs from the JSON file
    fs.readFile(path.join(__dirname, '../data/favs.json'), 'utf8', (err, data) => { //read the favs.JSON file
        var json = JSON.parse(data); //parse the data into a JavaScript object
        res.status(200).end(JSON.stringify(json, ['user', 'id_str', 'screen_name'])); //send the JSON data filtered to only include the user IDs and screen names
        console.log('sent ids');
    });
});

module.exports = router;