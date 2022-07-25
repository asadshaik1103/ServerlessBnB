import csv
import io
import json
import pandas as pd
from google.cloud import storage
from flask_cors import cross_origin

client = storage.Client()
bucketName = "visualizations5401"

def openFileAndAddData(row):
    def addData(foodData, data):
        foodData = foodData.append(data, ignore_index=True)
        return foodData
    try:
        bucket = client.get_bucket(bucketName)
        blob = bucket.blob("foodAnalysis.csv")
        csvBytes = io.BytesIO(blob.download_as_string())
        foodDF = pd.read_csv(csvBytes)
        foodDF = addData(foodDF, row)
        bucket.blob("foodAnalysis.csv").upload_from_string(foodDF.to_csv(index=False), 'text/csv')
        return "SUCCESS"
    except Exception as e:
        return str(e)

@cross_origin()
def process_request(request):
    try:
        request_json = request.get_json()
        print(request_json)
        return {"debug": openFileAndAddData(request_json)}
    except Exception as e:
        return "ERROR" + str(e)
