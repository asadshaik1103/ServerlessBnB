import requests
import json


def callingModelEndpoint(request):
  if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
  request_json = request.get_json(silent=True)
  # request_args = request.args
  print(request_json)
  print(type((request_json['preference_type'])))
  body = '''{
      "instances": [
        { "preference_type": "''' + str(request_json['preference_type']) +'''", "budget": "''' + str(request_json['budget']) + '''"}
      ]
  }'''
  print(body)
  headers = {'content-type': 'application/json', 'Authorization': 'Bearer ya29.A0AVA9y1urwOhDA3ZJAN8E8tVqfspF3X7GHPZ9QlHTaD9Dy6f908kZPrPINLphmmeCYlzFjf7qVZMXy3hWKhWs1r3o6rENSiFK3rVM7LR-VgQ34DZMVHV3pf1eQL70u5_rcaEUXbQ5xUrdpWpCfnor0vuiJstAxgYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4MlZNclRvUjV2X2d5MWhGRmJhQkwyQQ0165' }

  resp = requests.post('https://us-central1-aiplatform.googleapis.com/v1/projects/atomic-life-356321/locations/us-central1/endpoints/5677869249742241792:predict', data=body, headers=headers) #
  print(resp.text)
  print('sumit')
  print(type(resp.text))
  print(type(request_json))
  cont = json.loads(resp.text)
  data = cont | request_json
  print(data)
  headers1 = {'content-type': 'application/json'}
  storing_data = requests.post('https://nzgmojazgec4wfrt5hoc6kht3y0quxau.lambda-url.us-east-1.on.aws/', data=json.dumps(data), headers=headers1)
  print(storing_data.text)
  responseData = storing_data.text
  print(responseData)
  responseBody = responseData

  headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST'
  }
  return (responseBody, 200, headers)