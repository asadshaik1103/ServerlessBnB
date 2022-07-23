# from flask import escape
from google.cloud import storage
import flask
storage_client = storage.Client()
fileName = "feedback.txt"
bucketName = 'feedbackbucket-group22'

def check_if_file_exist():
    contents =''
    bucket = storage_client.bucket(bucketName)
    stats = storage.Blob(bucket=bucket, name=fileName).exists(storage_client)
    print(stats)
    
    if stats == True:
        bucket = storage_client.get_bucket(bucketName)
        blob = bucket.blob(fileName)
        contents = blob.download_as_string()
        return contents.decode('utf-8')
    return contents


def storeFeedback(request):
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
        
    print(request.headers['content-type'])
    print(request.get_json(silent=True))
    request_json = request.get_json(silent=True)
    request_args = request.args
    
    contents = check_if_file_exist()
    
    if contents == '':
        #insert data and create file
        print(request_json['data'])
        data = request_json['data']
    else :
        #append data to file and store
        print(contents + '\n~' + request_json['data'])
        data = contents + '\n~' + request_json['data']

    #logic to insert data to cloud storage file
    
    bucket = storage_client.bucket(bucketName)
    print(bucket)
    blob = bucket.blob(fileName)
    # print(blob)
    blob.upload_from_string(data, content_type='text/plain')
    # response.headers.set('Access-Control-Allow-Origin', '*')
    # response.headers.set('Access-Control-Allow-Methods', 'GET, POST')
    # resp = "sucessful"
    # response = flask.jsonify({"body":resp})
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST'
    }
    return ('sucessful', 200, headers)