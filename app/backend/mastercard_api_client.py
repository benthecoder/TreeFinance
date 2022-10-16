import os
import openapi_client as oac
from OpenSSL import crypto
from oauth1.signer_interceptor import add_signer_layer
from client_encryption.api_encryption import add_encryption_layer

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

P12_FILE = DIR_PATH + '/hackwashu-sandbox.p12'
KEYSTORE_PASSWORD = 'keystorepassword'
CONSUMER_KEY = 'iz8XP3LzyoJtJKXCVl_EhP-U7S5b9t_rsD66h92y2a40dcd2!de82ef10c9fe4a4e89bbd381c929a0a90000000000000000'
CONFIG_FILE = DIR_PATH + '/config.json'

def priceless():
    c = oac.Configuration()
    c.host = "https://sandbox.api.mastercard.com/priceless-planet-coalition"

    api_client = oac.ApiClient(c)

    add_signer_layer(api_client, P12_FILE, KEYSTORE_PASSWORD, CONSUMER_KEY) # equivalent to client.setHttpClient(httpClientBuilder.addInterceptor().build())
    add_encryption_layer(api_client, CONFIG_FILE)
    
    return api_client