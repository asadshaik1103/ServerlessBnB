from google.cloud import storage
from google.cloud import language_v1

storage_client = storage.Client()
language_client = language_v1.LanguageServiceClient()

def analysis_feedback(request):
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
        
    bucketName = 'feedbackbucket-group22'
    fileName = 'feedback.txt'
    region = 'us-east1'
    bucket = storage_client.get_bucket(bucketName)
    blob = bucket.blob(fileName)
    contents = blob.download_as_string() 
    print(contents.decode('utf-8'))
    contents = contents.decode('utf-8')
    listofFeedback = contents.split('\n~')
    analysisList = []
    for feedback in listofFeedback:
        feedbackanalysis = []
        feedbackanalysis.append(feedback)
        document = language_v1.Document(
            content=contents, type_=language_v1.Document.Type.PLAIN_TEXT
        )
        annotations = language_client.analyze_sentiment(request={"document": document})
        feedbackanalysis.append(annotations.document_sentiment.score)
        analysisList.append(feedbackanalysis)
    

    # Print the results
    print(annotations)
    print(annotations.document_sentiment.magnitude)
    # return({"data": analysisList})
    annotations.document_sentiment.score
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST'
    }
    return (str(annotations.document_sentiment.score), 200, headers)