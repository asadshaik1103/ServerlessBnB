/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'serverless-bnb-6c350';
const COLLECTION_NAME = 'user_data';
const axios = require('axios');
const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true
});

exports.bookRoomAndPublish = (req, res) => {
    let message = req.query.message || req.body.message || 'Hello World!';
    var request = req.body;
    // res.status(200).send('Hello World!');
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        console.log("before publishing: ", request);
        axios.post('https://us-central1-serverless-project-356217.cloudfunctions.net/publishGCPMessage', {
            "userNotificationNumber": request.userNotificationNumber,
            "topicName": "roomBooking",
            "message": {
                "test": "test 1",
                "email": request.email,
                "accessToken": request.accessToken,
                "userid-cognito": request['useridCognito'],
                "userid-bnb": request['useridBnb'],
                "room": request['roomInfo']
            }
        })
            .then(response => {
                // console.log("res test 1", response);
                console.log("after publishing response: ", response);
                console.log("before subcribing");
                axios.post('https://jvu5dzngozg4wijdat5q7yhgme0ukoxt.lambda-url.us-east-1.on.aws/', {
                    "userNotificationNumber": request.userNotificationNumber
                }).then((resFromHotel => {
                    console.log("resFromHotel: ", resFromHotel);
                    console.log("after subcribing response: ", response);
                    return res.status(200).json({
                        message: "success"
                    });
                })).catch(function (error) {
                    console.log(error);
                    return res.status(500).json({
                        error: error
                    });
                })

            })
            .catch(function (error) {
                console.log(error);
                return res.status(500).json({
                    error: error
                });
            });
    }

};
