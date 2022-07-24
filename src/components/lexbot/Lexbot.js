import { Amplify, Interactions } from 'aws-amplify';
import { AmplifyChatbot } from '@aws-amplify/ui-react/legacy';


Amplify.configure({
  Auth: {
    identityPoolId:"us-east-1:eda524fd-5fd9-4fd3-bb47-52446e8806d4",
    region: 'us-east-1',
  },
  Interactions: {
    bots: {
      BandBapplication: {
        name: 'BandBapplication',
        alias: '$LATEST',
        region: 'us-east-1',
      }
    }
  }

});

function Lexbot() {
  return (
    <AmplifyChatbot
    botName="BandBapplication"
    botTitle="BandBapplication"
    welcomeMessage="Hello, how can I help you?"
  />
    
  );
}

export default Lexbot;
