/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

 const Firestore = require('@google-cloud/firestore');
 const PROJECTID = 'serverless-bnb-6c350';
 const COLLECTION_NAME = 'rooms_data';
 const firestore = new Firestore({
   projectId: PROJECTID,
   timestampsInSnapshots: true
 });
 
 exports.getAllRoomsData = (req, res) => {
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
     return firestore.collection(COLLECTION_NAME)
     .get()
     .then(docs => {
       const docsInfo = [];
       docs.forEach(doc => {
         console.log(doc.id, '=>', doc.data());
         docsInfo.push(doc.data());
       });
       res.status(200).send({
         docsInfo: docsInfo
       });
     }).catch(err => {
       console.error(err);
       return res.status(404).send({
         error: 'Unable to retrieve the document',
         err: err
       });
     });
   }
 
 };
 