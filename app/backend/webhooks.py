from http.server import BaseHTTPRequestHandler, HTTPServer
import os
import json
from twilio.rest import Client
from dotenv import load_dotenv
import mastercard

# TODO: update this to flask localhost
hostName = "localhost"
serverPort = 8080

class TransNotificationHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        trans = json.loads(self.rfile.read(content_length))
        cardReference = trans['cardReference']
        amount = trans['cardholderAmount']
        currency = trans['cardholderCurrency']
        merchant = trans['merchantName']
        
        impact_metrics = mastercard.impact_metrics(amount, currency)
        # print(f'received transaction for card {cardReference}, amount={amount} {currency} at {merchant}')
        message = f"""
        Received transaction for card {cardReference}, amount={amount} {currency} at {merchant}.
        
        Make an environmental impact today by rounding up and donating your {amount} change to plant {impact_metrics.trees}. Use the link below to donate!
        
        <some_link>
        """
        # print (message)
        send_message("+12403837465", message)
        self.send_response(200)
        self.end_headers()

def init_twilio():
    load_dotenv()
    ACCOUNT_SID = os.getenv("ACCOUNT_SID")
    AUTH_TOKEN = os.getenv("AUTH_TOKEN")
    client = Client(ACCOUNT_SID, AUTH_TOKEN)

    return client

def send_message(to_phone: str, message: str) -> str:
    client = init_twilio()
    from_phone = "+15154979533"

    try:
        message = client.messages.create(body=message, to=to_phone, from_=from_phone)
        print(message.sid)
    except Exception as e:
        print(f"Exception caught: {e}")
        return "message failed to send"
    return "message successfully sent"
    
# TODO: integrate this with twilio, set up an endpoint to call mock_transaction()
def subscribe_to_trans_notification():
    server = HTTPServer((hostName, serverPort), TransNotificationHandler)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass

    server.server_close()
