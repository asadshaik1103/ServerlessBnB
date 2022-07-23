 /**
 * @author Vibhor Bhatnagar <vibhor.bhatnagar@dal.ca>
 */
 
 const { PubSub, v1 } = require('@google-cloud/pubsub');
 const project_id = "serverless-project-356217";
 const subscriberClient = new v1.SubscriberClient({
   keyFilename: './serverless-project-356217-dc98b37fadb2.json',
 });
 exports.subscribeToGCPMessage = (req, res) => {
   res.set('Access-Control-Allow-Origin', '*');
   if (req.method === 'OPTIONS') {
     // Send response to OPTIONS requests
     res.set('Access-Control-Allow-Methods', 'GET');
     res.set('Access-Control-Allow-Headers', 'Content-Type');
     res.set('Access-Control-Max-Age', '3600');
     res.status(204).send('');
   } else {
     
      const { userNotificationNumber } = req.body;
      const subscriptionName = `sub-${userNotificationNumber}`;
      const formattedSubscription = subscriberClient.subscriptionPath(
      project_id,
      subscriptionName,
    );
     console.log("inside CF publish message");
    return subscriberClient.pull({
      subscription: formattedSubscription,
      maxMessages: 10,
    }).then(responseFromPulling => {
      const messages = [];
      console.log("responseFromPulling: ", responseFromPulling);
      const ackIds = [];
      const [responseMessages] = responseFromPulling;
      for (const message of responseMessages.receivedMessages) {
        messages.push({
          ...JSON.parse(message.message.data.toString()),
          ackId: message.ackId,
        });
        ackIds.push(message.ackId);
      }

      const ackRequest = {
        subscription: formattedSubscription,
        ackIds: ackIds,
      };
      if (ackIds.length) {
        subscriberClient.acknowledge(ackRequest).then(resfromAcknowledgement => {
          console.log("resfromAcknowledgement: ", resfromAcknowledgement);
          res.status(200).json({ messages });
        });
      }
    });
   }
 };

 //Code Reference: https://cloud.google.com/pubsub/docs/create-subscription
 