/**
 * @author Vibhor Bhatnagar <vibhor.bhatnagar@dal.ca>
 */
 
 const { PubSub, v1 } = require('@google-cloud/pubsub');
 const project_id = "serverless-project-356217";
 const pubsub = new PubSub({
   keyFilename: './serverless-project-356217-dc98b37fadb2.json',
 });
 const subscriberClient = new v1.SubscriberClient({
   keyFilename: './serverless-project-356217-dc98b37fadb2.json',
 });
 exports.publishGCPMessage = (req, res) => {
   res.set('Access-Control-Allow-Origin', '*');
   if (req.method === 'OPTIONS') {

     res.set('Access-Control-Allow-Methods', 'GET');
     res.set('Access-Control-Allow-Headers', 'Content-Type');
     res.set('Access-Control-Max-Age', '3600');
     res.status(204).send('');
   } else {
     
      const { topicName, message, userNotificationNumber } = req.body;
     const subscriptionName = `sub-${userNotificationNumber}`;
     console.log("inside CF publish message");

    //Create subscription in topic with filter userNotificationNumber
    return pubsub.topic(topicName).createSubscription(subscriptionName, {
      filter: `attributes.userNotificationNumber="${userNotificationNumber}"`
    }).then((response) => {
      //Publish message to topic name
      pubsub.topic(topicName).publishMessage({
        data: Buffer.from(JSON.stringify(message)),
        attributes: { userNotificationNumber },
      }).then((responseFromPublish) => {
        res.status(200).send({
          message: "success"
        })
      });
    });
   }
 };
 
 //Code Reference: https://cloud.google.com/pubsub/docs/publisher