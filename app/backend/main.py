import plaid, json, datetime, time, os

from plaid.exceptions import ApiException
from plaid.model.payment_amount import PaymentAmount
from plaid.model.payment_amount_currency import PaymentAmountCurrency
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from plaid.model.recipient_bacs_nullable import RecipientBACSNullable
from plaid.model.payment_initiation_address import PaymentInitiationAddress
from plaid.model.payment_initiation_recipient_create_request import (
    PaymentInitiationRecipientCreateRequest,
)
from plaid.model.payment_initiation_payment_create_request import (
    PaymentInitiationPaymentCreateRequest,
)
from plaid.model.payment_initiation_payment_get_request import (
    PaymentInitiationPaymentGetRequest,
)
from plaid.model.link_token_create_request_payment_initiation import (
    LinkTokenCreateRequestPaymentInitiation,
)
from plaid.model.item_public_token_exchange_request import (
    ItemPublicTokenExchangeRequest,
)
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.asset_report_create_request import AssetReportCreateRequest
from plaid.model.asset_report_create_request_options import (
    AssetReportCreateRequestOptions,
)
from plaid.model.asset_report_user import AssetReportUser
from plaid.model.asset_report_get_request import AssetReportGetRequest
from plaid.model.asset_report_pdf_get_request import AssetReportPDFGetRequest
from plaid.model.auth_get_request import AuthGetRequest
from plaid.model.transactions_sync_request import TransactionsSyncRequest
from plaid.model.identity_get_request import IdentityGetRequest
from plaid.model.investments_transactions_get_request_options import (
    InvestmentsTransactionsGetRequestOptions,
)
from plaid.model.investments_transactions_get_request import (
    InvestmentsTransactionsGetRequest,
)
from plaid.model.accounts_balance_get_request import AccountsBalanceGetRequest
from plaid.model.accounts_get_request import AccountsGetRequest
from plaid.model.investments_holdings_get_request import InvestmentsHoldingsGetRequest
from plaid.model.item_get_request import ItemGetRequest
from plaid.model.institutions_get_by_id_request import InstitutionsGetByIdRequest
from plaid.model.transfer_authorization_create_request import (
    TransferAuthorizationCreateRequest,
)
from plaid.model.transfer_create_request import TransferCreateRequest
from plaid.model.transfer_get_request import TransferGetRequest
from plaid.model.transfer_network import TransferNetwork
from plaid.model.transfer_type import TransferType
from plaid.model.transfer_user_in_request import TransferUserInRequest
from plaid.model.ach_class import ACHClass
from plaid.model.transfer_create_idempotency_key import TransferCreateIdempotencyKey
from plaid.model.transfer_user_address_in_request import TransferUserAddressInRequest
from plaid.api import plaid_api


import flask
from flask_cors import CORS

PLAID_COUNTRY_CODES = ["US", "CA"]
PLAID_PRODUCTS = ["auth", "transactions"]
PLAID_ENV = "sandbox"

if PLAID_ENV == "sandbox":
    host = plaid.Environment.Sandbox

if PLAID_ENV == "development":
    host = plaid.Environment.Development

if PLAID_ENV == "production":
    host = plaid.Environment.Production


api_info = json.load(open("plaid_api_secrets.json", "r"))

configuration = plaid.Configuration(
    host=host,
    api_key={
        "clientId": api_info["client_id"],
        "secret": api_info["secret_sandbox"],
    },
)


api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)

products = []
for product in PLAID_PRODUCTS:
    products.append(Products(product))

app = flask.Flask(__name__,static_folder='../build', static_url_path='/')
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/")
def my_profile():
    return "Hello world"


@app.route("/api/create_link_token", methods=["POST"])
def create_link_token():
    try:
        request = LinkTokenCreateRequest(
            products=products,
            client_name="Plaid Quickstart",
            country_codes=list(map(lambda x: CountryCode(x), PLAID_COUNTRY_CODES)),
            language="en",
            user=LinkTokenCreateRequestUser(client_user_id=str(time.time())),
        )
        # create link token
        response = client.link_token_create(request)
        return flask.jsonify(response.to_dict())
    except plaid.ApiException as e:
        return json.loads(e.body)


# Exchange token flow - exchange a Link public_token for
# an API access_token
# https://plaid.com/docs/#exchange-token-flow


@app.route("/api/set_access_token", methods=["POST"])
def get_access_token():
    global access_token
    global item_id
    global transfer_id
    data = flask.request.get_json()
    public_token = data.get("public_token", "")

    # public_token = flask.request.form["public_token"]
    try:
        exchange_request = ItemPublicTokenExchangeRequest(public_token=public_token)
        exchange_response = client.item_public_token_exchange(exchange_request)
        return flask.jsonify(exchange_response.to_dict())
    except plaid.ApiException as e:
        return json.loads(e.body)


@app.route("/api/transactions", methods=["POST"])
def transactions():
    data = flask.request.get_json()
    user_auth = data.get("access_token", "")

    cursor = ""
    added = []
    modified = []
    removed = []
    has_more = True
    try:
        while has_more:
            request = TransactionsSyncRequest(access_token=user_auth, cursor=cursor)
            response = client.transactions_sync(request).to_dict()
            added.extend(response["added"])
            modified.extend(response["modified"])
            removed.extend(response["removed"])
            has_more = response["has_more"]
            cursor = response["next_cursor"]

        transactions = sorted(added, key=lambda t: t["date"])
        return flask.jsonify({"transactions": transactions})
    except plaid.ApiException as e:
        error_response = e
        return flask.jsonify(error_response)


if __name__ == "__main__":
    app.run(port=8739)
