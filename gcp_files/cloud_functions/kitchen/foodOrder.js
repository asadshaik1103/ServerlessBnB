const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'csci5410-project-356905';
const COLLECTION_NAME = 'foodorders';
const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true
});

exports.foodOrder = async(req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
        res.end();
    }
    else{
      request_json = req.body;
      try{
        firestore.collection(COLLECTION_NAME)
            .doc(request_json.order_id)
            .set({order_id: request_json.order_id, customer_id: request_json.customer_id, food_item: request_json.food_item, food_quantity: request_json.food_quantity})
            return res.status(200).send({"message":"Order updated in database successfully"});
      }
      catch (err) {
        return res.status(500).json({
            "message": "something went wrong"
        })
    }
    }
};
