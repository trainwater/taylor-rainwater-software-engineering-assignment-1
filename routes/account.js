//////////////////////////////////////////
/// Author: Taylor Rainwater 113430036 ///
//////////////////////////////////////////

//imports
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router(); //router to handle all HTTP requests to http://127.0.0.1:3000/account
var jsonParser = bodyParser.json(); //object to parse JSON data from the body of an HTTP request

router.put('/:screenName', jsonParser, (req, res, next) => { //HTTP PUT requests used to updata screen names
    const screenName = req.params.screenName; //screen name selected by the client

    fs.readFile(path.join(__dirname, '../data/favs.json'), 'utf8', (err, data) => { //read favs.JSON
        var json = JSON.parse(data); //parse JSON into javaScript object
        var payload = req.body.screen_name; //new screen name sent in the HTTP request
        var response = 'request failed'; //variable to store the HTTP response

        for (let i = 0; i < json.length; i++) { //checks each element in the file for the old screen name and updates the screen name to the new one if found
            if (json[i].user.screen_name == screenName) {
                json[i].user.screen_name = payload;
                response = 'request processed';
            }
        }

        if (response == 'request failed') { //send a 404 request if the screen name was not updated
            res.status(404).end(response);
            console.log('failed to update screen name of ' + screenName);
        }
        else { //saves the updated file and sends a 200 status if the screen name was updated
            fs.writeFile(path.join(__dirname, '../data/favs.json'), JSON.stringify(json, null, '\t'), err => {
                if (err) {
                    console.error(err);
                    return;
                }
            });

            res.status(200).end(response);
            console.log('updated screen name of ' + screenName + ' to ' + payload);
        }
    });
});

module.exports = router;