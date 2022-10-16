import os
import openapi_client as oac
from OpenSSL import crypto
from oauth1.oauth import OAuth
import oauth1.authenticationutils as authenticationutils
from oauth1.signer_interceptor import add_signer_layer
from client_encryption.api_encryption import add_encryption_layer

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

P12_FILE = DIR_PATH + '/hackwashu-sandbox.p12'
KEYSTORE_PASSWORD = os.getenv('KEYSTORE_PASSWORD')
CONSUMER_KEY = os.getenv('CONSUMER_KEY')

def priceless():
    c = oac.Configuration()
    c.host = "https://sandbox.api.mastercard.com/priceless-planet-coalition"

    api_client = oac.ApiClient(c)

    add_signer_layer(api_client, P12_FILE, KEYSTORE_PASSWORD, CONSUMER_KEY) # equivalent to client.setHttpClient(httpClientBuilder.addInterceptor().build())
    
    return api_client