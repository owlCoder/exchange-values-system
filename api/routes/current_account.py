from flask import Blueprint, jsonify, request
from flasgger import swag_from
from controllers.current_account import *
from services.account_number_generator import generate_account_number
from services.currencies_service import convert_currency
from config.exlude_docs_str import exclude_docstring
from flasgger import swag_from

current_account_blueprint = Blueprint('current_account_blueprint', __name__)

@current_account_blueprint.route('/api/account/topup', methods=['POST'])
@swag_from({
    'tags': ['Current Account'],
    'summary': 'Top up the balance of a current account or create a new account',
    'description': 'Endpoint to top up the balance of a current account or create a new account if it does not exist.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'card_number': {'type': 'string'},
                    'uid': {'type': 'integer'},
                    'amount': {'type': 'number', 'format': 'float'},
                    'currency': {'type': 'string'}
                },
                'required': ['card_number', 'uid', 'amount', 'currency']
            }
        }
    ],
    'responses': {
        201: {'description': 'Account balance has been topped up'},
        500: {'description': 'Account balance hasn\'t been changed'},
        400: {'description': 'Please provide valid data'}
    }
})
@exclude_docstring
def top_up_current_account():
    """
    Route to top up the balance of a current account or create a new account if it doesn't exist.

    Request:
        - Method: POST
        - Route: /api/account/topup
        - JSON Payload:
            {
                "card_number": "string",
                "uid": int,
                "amount": float,
                "currency": "string"
            }

    Returns:
        JSON: Message indicating the status of the operation and HTTP status code.
    """
    data = request.get_json()
    card_number = data.get('card_number')
    uid = data.get('uid')
    amount = data.get('amount')
    currency = data.get('currency')

    if not card_number or not uid or not amount or not currency:
        return jsonify({'data': 'Please provide valid data'}), 400
    
    account_id = check_account_exists(uid, card_number, currency)
    account = get_account_number(uid, card_number)

    # If credit card has no active account, create a new one
    account_number = account.account_number if account else generate_account_number()

    if account_id:
        if update_account_balance(account_id, amount):
            return jsonify({'data': 'Account balance has been topped up'}), 201
        else:
            return jsonify({'data': 'Account balance hasn\'t been changed'}), 500
    else:
        if account_number and create_current_account(account_number, amount, currency, card_number, uid): 
            return jsonify({'data': 'Account balance has been topped up'}), 201
        else:
            return jsonify({'data': 'Account balance hasn\'t been changed'}), 501

@current_account_blueprint.route('/api/accounts/getAccountsByCard', methods=['POST'])
@swag_from({
    'tags': ['Current Account'],
    'summary': 'Fetch all accounts associated with a specified credit card number',
    'description': 'Endpoint to fetch all accounts associated with a specified credit card number.',
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'card_number': {'type': 'string'}
                },
                'required': ['card_number']
            }
        }
    ],
    'responses': {
        200: {'description': 'Serialized list of accounts associated with the provided card_number'},
        204: {'description': 'No current accounts'},
        500: {'description': 'Error occurred while fetching accounts'}
    }
})
@exclude_docstring
def get_accounts_by_card_number():
    """
    Route to fetch all accounts associated with a specified credit card number.

    Request:
        - Method: POST
        - Route: /api/accounts/getAccountsByCard
        - JSON Payload:
            {
                "card_number": "string"
            }

    Returns:
        JSON: Serialized list of accounts associated with the provided card_number and HTTP status code.
    """
    try:
        card_number = request.get_json().get('card_number')
        accounts = get_all_current_accounts(card_number)

        if accounts:
            serialized_accounts = [account.serialize() for account in accounts]
            return jsonify(serialized_accounts), 200
        else:
            return jsonify({'message': 'No current accounts'}), 204
    except Exception as e:
         return jsonify({'message': 'Error occurred while fetching accounts'}), 500
    
@current_account_blueprint.route('/api/account/exchange', methods=['POST'])
@exclude_docstring
def exchange_current_account():
    data = request.get_json()
    account_id = data.get('account_id')
    initial_currency = data.get('initial_currency')
    amount_to_exchange = data.get('amount_to_exchange')
    currency_to_convert = data.get('currency_to_convert')
    new_balance = float(convert_currency(amount_to_exchange, initial_currency, currency_to_convert))

    if not account_id or not initial_currency or not amount_to_exchange or not currency_to_convert:
        return jsonify({'data': 'Please provide valid data'}), 400
    
    response = exchange_funds(account_id, new_balance, amount_to_exchange, currency_to_convert)
    
    return jsonify({'data': response['error']}), response['code']
