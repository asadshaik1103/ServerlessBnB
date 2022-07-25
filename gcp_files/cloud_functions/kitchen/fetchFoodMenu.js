const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'csci5410-project-356905';
const COLLECTION_NAME = 'foodmenu';
const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true
});

exports.fetchFoodMenu = async(req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
        res.end();
    }
    else{
      try{
        const snapshot = await firestore.collection(COLLECTION_NAME).get()
        const documents = [];
        snapshot.forEach(doc => {
          const document = doc.data();
          documents.push(document);
        });
        console.log(documents[0])
        Promise.all(documents)
          .then(values => {
            return res.status(200).send(values);
          });
      }
      catch (err) {
        return res.status(500).json({
            "message": "something went wrong"
        })
    }
    }
};

