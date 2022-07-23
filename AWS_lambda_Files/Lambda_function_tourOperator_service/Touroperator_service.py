import json

def lambda_handler(event, context):
    # TODO implement
    # print(context)
    # print(event)
    text1 = (event["body"])
    print(type(text1))
    
    
    text = text1.replace('''
        '
    ''', '''
    "
    ''')
    print(type(text))
    print(text)
    text = json.loads(text)
    print(type(text))
    listscore = text["predictions"][0]["scores"]
    for l in listscore:
        print(l)
    maxitem = listscore.index(max(listscore))
    print(maxitem)
    print(type(text))
    print(text)
    print(text['deployedModelId'])
        # TODO: write code...)
    if maxitem == 0:
        tour_type = "deep water fishing"
        totalCost = int(text['number_of_people']) * 200
    elif maxitem == 1:
        tour_type = "halifax city tour"
        totalCost = int(text['number_of_people']) * 75
    else:
        tour_type = "peggys cove"
        totalCost = int(text['number_of_people']) * 175
    data  = f'''{{"tour":"{tour_type}"}}'''
    storing_data = f'''{{"userId":"{text['user']}", "tour":"{tour_type}", "budget":"{text['budget']}", "number_of_people":"{text['number_of_people']}", "date": "{text['date']}", "cost":"{totalCost}"}}'''
    print(storing_data)
    return {
        'statusCode': 200,
        'body': storing_data
    }
