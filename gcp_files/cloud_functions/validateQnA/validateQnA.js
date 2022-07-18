/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const Firestore = require("@google-cloud/firestore");
const PROJECTID = "serverless-bnb-6c350";
const COLLECTION_NAME = "user_data";
const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true,
});

exports.validateQnA = (req, res) => {
    let message = req.query.message || req.body.message || "Hello World!";
    var request = req.body;
    // res.status(200).send('Hello World!');
    res.set("Access-Control-Allow-Origin", "*");

    if (req.method === "OPTIONS") {
        // Send response to OPTIONS requests
        res.set("Access-Control-Allow-Methods", "GET");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
    } else {
        return firestore
            .collection(COLLECTION_NAME)
            .doc("registration_data")
            .get()
            .then((doc) => {
                if (!(doc && doc.exists)) {
                    return res.status(404).send({
                        error: "Unable to find the document",
                    });
                }
                const data = doc.data();
                if (!data) {
                    return res.status(404).send({
                        error: "Found document is empty",
                    });
                }
                const userDataFromFirestore = data[request.email];
                if (
                    userDataFromFirestore["answerFirst"] === request["answerFirst"] &&
                    userDataFromFirestore["answerSecond"] === request["answerSecond"]
                ) {
                    return res.status(200).send({
                        status: 200,
                        message: "User is valid",
                        valid: true,
                    });
                }

                return res.status(200).send({
                    status: 200,
                    message: "User is invalid",
                    valid: false,
                });
            })
            .catch((err) => {
                console.error(err);
                return res.status(404).send({
                    error: "Unable to retrieve the document",
                    err,
                });
            });
    }
};
