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
  headers = {'content-type': 'application/json', 'Authorization': 'Bearer ya29.A0AVA9y1v12WvV2T-PZ61_nHiIdBrxjekBHxBNQUWbVvJzOOrQXrEtz3bxCSfGIHLxMGlqgwT3d1vp59GKMIvXIKGID51z4C1uLdoMmC0n-_nDOSmcDywmd2JWE0EozoARrQh25ubxPJXWg_sO6zdQ9FP0eirc2QYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4T1JXYXBCei1qT25aeVl3Ui1VckpGUQ0165' }

  resp = requests.post('https://us-central1-aiplatform.googleapis.com/v1/projects/atomic-life-356321/locations/us-central1/endpoints/5677869249742241792:predict', data=body, headers=headers) #
  print(resp.text)
  #storing in cloud storage
  # datares = store_data(resp, request_json)
  print('sumit')
  print(type(resp))

  if isinstance(resp, dict):
    text = resp
    
  else:
    text = json.loads(resp.content)
  # print(type(text))
  # dict_str = text.decode("UTF-8")
  # mydata = ast.literal_eval(dict_str)
  # print(mydata)
  print(text)
  listscore = text['predictions'][0]['scores']
  for l in listscore:
    print(l)
  maxitem = listscore.index(max(listscore))
  print(maxitem)
  if maxitem == 0:
    tour_type = "deep water fishing"
    totalCost = int(request_json['number_of_people']) * 200
  elif maxitem == 1:
    tour_type = "halifax city tour"
    totalCost = int(request_json['number_of_people']) * 75
  else:
    tour_type = "peggys cove"
    totalCost = int(request_json['number_of_people']) * 175
  data  = f'''{{"tour":"{tour_type}"}}'''
  storing_data = f'''{{"tour":"{tour_type}", "budget":"{request_json['budget']}", "number_of_people":"{request_json['number_of_people']}",
  "date": "{request_json['date']}", "cost"="{totalCost}"}}'''
  print(storing_data)
  headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST'
  }
  return (storing_data, 200, headers)