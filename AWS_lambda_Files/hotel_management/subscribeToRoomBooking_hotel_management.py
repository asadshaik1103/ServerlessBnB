import json
import requests
import time
import boto3

def lambda_handler(event, context):
    print(event)
    try:
        print("body " + event['body'])
        reqBody = json.loads(event['body'])
        # print("reqBody: " + reqBody)
        print("userNotificationNumber: " + str(reqBody['userNotificationNumber']))
        # userNotificationNumber = event['body']['userNotificationNumber']
        url = 'https://us-central1-serverless-project-356217.cloudfunctions.net/subscribingToTopic?userNotificationNumber=' + str(reqBody['userNotificationNumber'])
        print(url)
        response = requests.get(url)
    except Exception as e:
        print(e)
        print("error")
    print(response.text)
    time.sleep(5)
    print("after sleep")
    dynamo = boto3.client('dynamodb', 'us-east-1')
    subcriptionMessage = json.loads(response.text)
    print(type(subcriptionMessage))
    print(type(subcriptionMessage["messages"][0]))
    print(subcriptionMessage["messages"][0]["email"])
    dynamo.put_item(TableName='booked_rooms_data', Item={
            'email': {'S':subcriptionMessage["messages"][0]["email"]},
            'userid-cognito': {'S':subcriptionMessage["messages"][0]["userid-cognito"]},
            'userid-bnb': {'S':subcriptionMessage["messages"][0]["userid-bnb"]},
            'room_number': {'S':subcriptionMessage["messages"][0]["room"]["room_number"]}
        
    })
    return {
        'statusCode': 200,
        'body': json.dumps(response.text)
    }