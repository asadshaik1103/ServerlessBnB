/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'serverless-bnb-6c350';
const COLLECTION_NAME = 'user_data';
const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true
});

// source: https://gist.github.com/EvanHahn/2587465
var caesarShift = function (str, amount) {
    // Wrap the amount
    if (amount < 0) {
        return caesarShift(str, amount + 26);
    }

    // Make an output variable
    var output = "";

    // Go through each character
    for (var i = 0; i < str.length; i++) {
        // Get the character we'll be appending
        var c = str[i];

        // If it's a letter...
        if (c.match(/[a-z]/i)) {
            // Get its code
            var code = str.charCodeAt(i);

            // Uppercase letters
            if (code >= 65 && code <= 90) {
                c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            }

            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            }
        }

        // Append
        output += c;
    }

    // All done!
    return output;
};

exports.ValidateCipherCode = (req, res) => {
    var request = req.body;
    let challengeText = request.challengeText; // TODO from request
    let userCipherAnswer = request.cipherAnswer; // TODO from request

    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        return firestore.collection(COLLECTION_NAME)
            .doc("registration_data")
            .get()
            .then(doc => {
                if (!(doc && doc.exists)) {
                    return res.status(404).send({
                        error: 'Unable to find the document'
                    });
                }
                const data = doc.data();
                if (!data) {
                    return res.status(404).send({
                        error: 'Found document is empty'
                    });
                }
                const userDataFromFirestore = data[request.email];
                let decryptedCipher = caesarShift(challengeText, Number(userDataFromFirestore['cipherShiftKey']));
                if (decryptedCipher === request['cipherAnswer']) {
                    return res.status(200).send({
                        status: 200,
                        message: 'User is valid',
                        valid: true,
                        decryptedCipher: decryptedCipher
                    });
                }

                return res.status(200).send({
                    status: 200,
                    message: 'User is invalid',
                    valid: false,
                    decryptedCipher: decryptedCipher
                });
            }).catch(err => {
                console.error(err);
                return res.status(404).send({
                    error: 'Unable to retrieve the document',
                    err
                });
            });
    }
};


