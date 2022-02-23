//////////////////////////////////////////
/// Author: Taylor Rainwater 113430036 ///
//////////////////////////////////////////

//imports
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express.Router(); //router to handle all HTTP requeats to http://127.0.0.1:3000/tweets
var jsonParser = bodyParser.json(); //object to parse JSON data from the body of an HTTP request

router.get('/', (req, res, next) => { //HTTP GET requests used to reitrieve tweets
    fs.readFile(path.join(__dirname, '../data/favs.json'), 'utf8', (err, data) => { //read the favs.JSON file
        var json = JSON.parse(data); //parse JSON data into a JavaScript object
        res.status(200).end(JSON.stringify(json, ['created_at', 'text'])); //respond with the JSON data filtered to only return created_at and text from the tweets
        console.log('sent tweets');
    });
});

router.get('/:tweetID', (req, res, next) => { //HTTP GET requests used to get tweets with a specific ID
    const id = req.params.tweetID; //variable with ID provided by the client

    fs.readFile(path.join(__dirname, '../data/favs.json'), 'utf8', (err, data) => {
        var json = JSON.parse(data);
        var sent = false; //variable which stores weather or not the rwquest could be filled

        for (let i = 0; i < json.length; i++) { //searches every item in the file for the given tweet ID and responds to the HTTP request with the tweet if it exists
            if (json[i].id_str == id) {
                res.status(200).end(JSON.stringify(json[i], ['created_at', 'text']));
                sent = true;
                console.log('sent tweet ' + id);
            }
        }

        if (!sent) { //if the tweet does not exist, respond with status 404
            res.status(404).end('404: resource not found');
            console.log('could not find tweet ' + id);
        }
    });
});

router.post('/', jsonParser, (req, res, next) => { //HTTP POST used to create new tweets
    fs.readFile(path.join(__dirname, '../data/favs.json'), 'utf8', (err, data) => {
        var json = JSON.parse(data);
        var text = req.body.text; //body of the HTTP request sotres the text of the new tweet
        var id = req.body.id_str; //body of the HTTP request also stores the ID of the new tweet
        var response = 'request processed'
        var today = new Date(); //time object to get the date and time the tweet is created
        var time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var data = { //JSON data storing the creation time, tweet ID, text, and anonymous user data
            "created_at": time,
            "id_str": id,
            "text": text,
            "user": {
                "id_str": "0000000",
                "screen_name": "Anon"
            }
        }

        for (let i = 0; i < json.length; i++) { //checks to make sure the given tweet ID does not already exist in the set, and that a valid id and text body were provided
            if (json[i].id_str == id | (id == '' && text == '')) {
                response = 'request failed';
            }
        }

        if (response == 'request processed') { //if the new tweet is vallid
            json.push(data); //add it to the parsed JSON object

            fs.writeFile(path.join(__dirname, '../data/favs.json'), JSON.stringify(json, null, '\t'), err => { //write the edited file with the new tweet
                if (err) {
                    console.error(err);
                    return;
                }
            });

            res.status(200).end(response); //send 200 response
            console.log('posted tweet ' + id);
        }
        else { //if the tweet was not valid, send a 400 response status
            res.status(400).end(response);
            console.log('failed to post tweet ' + id);
        }
    });
});

router.delete('/:id', (req, res, next) => { //HTTP DELETE used to handle the deletion of tweets
    const id = req.params.id; //the id to be deleted given by the client
    var response = 'request failed';

    fs.readFile(path.join(__dirname, '../data/favs.json'), 'utf8', (err, data) => {
        var json = JSON.parse(data);

        for (let i = 0; i < json.length; i++) { //check the id of each tweet, if it matches the given ID, delete it
            if (json[i].id_str == id) {
                json.splice(i, 1);
                response = 'request processed';
            }
        }

        if (response == 'request processed') { //if the tweet was deleted, write the edited JSON file
            fs.writeFile(path.join(__dirname, '../data/favs.json'), JSON.stringify(json, null, '\t'), err => {
                if (err) {
                    console.error(err);
                    return;
                }
            });

            res.status(200).end(response);
            console.log('deleted tweet ' + id);
        }
        else { //if the tweet was not found send status code 404
            res.status(404).end(response);
            console.log('failed to post tweet ' + id);
        }
    });
});

module.exports = router;