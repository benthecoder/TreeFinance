import os
import json
import requests
import openapi_client as priceless
from OpenSSL import crypto
from oauth1.oauth import OAuth
import oauth1.authenticationutils as authenticationutils
from oauth1.signer_interceptor import add_signer_layer
from client_encryption.api_encryption import add_encryption_layer

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

P12_FILE = DIR_PATH + '/hackwashu-sandbox.p12'
KEYSTORE_PASSWORD = os.getenv('KEYSTORE_PASSWORD')
CONSUMER_KEY = os.getenv('CONSUMER_KEY')

def impact_metrics(donation_amount, currency):
    c = priceless.Configuration()
    c.host = "https://sandbox.api.mastercard.com/priceless-planet-coalition"

    api_client = priceless.ApiClient(c)

    add_signer_layer(api_client, P12_FILE, KEYSTORE_PASSWORD, CONSUMER_KEY) # equivalent to client.setHttpClient(httpClientBuilder.addInterceptor().build())
    
    impact_metric_api = priceless.ImpactMetricsApi(api_client)
    res = impact_metric_api.get_impact_metrics(donation_amount, currency)
    impact_metrics = res.to_dict()
    
    return impact_metrics

def register_consent():
    host = "https://sandbox.api.mastercard.com/openapis/authentication/consents/b8bd7cdb-88d9-4d22-96b6-5e55cc932ce6/start-authentication"
    signing_key = authenticationutils.load_signing_key(P12_FILE, KEYSTORE_PASSWORD)
    data = json.dumps({
        "auth": {
            "type": "THREEDS",
            "params": {}
        },
        "cardDetails": {
            "pan": "5456600015270577",
            "expiryMonth": 2,
            "expiryYear": 2032,
            "cvc": "845",
            "cardholderName": "Ben"
        }
    })
    auth_header = OAuth().get_authorization_header(host, 'POST', data, CONSUMER_KEY, signing_key)
    
    headers = {
        "Authorization": auth_header,
        "Content-Type": "application/json"
    }
    
    response = requests.post(host, headers=headers, data=data).text
    return response

def mock_transaction(transaction):
    host = "https://sandbox.api.mastercard.com/openapis/notifications/transactions"
    signing_key = authenticationutils.load_signing_key(P12_FILE, KEYSTORE_PASSWORD)
    auth_header = OAuth().get_authorization_header(host, 'POST', transaction, CONSUMER_KEY, signing_key)
    
    headers = {
        "Authorization": auth_header,
        "Content-Type": "application/json"
    }
    
    response = requests.post(host, headers=headers, data=transaction).text
    return response
    
    