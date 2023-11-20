from flask import Blueprint, jsonify, request
from controllers.current_account import *
from services.account_number_generator import generate_account_number

current_account_blueprint = Blueprint('current_account_blueprint', __name__)

# Route to top up the balance of a current account or create a new account if it doesn't exist
@current_account_blueprint.route('/api/account/topup', methods=['POST'])
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

    if account_id:
        if update_account_balance(account_id, amount):
            return jsonify({'data': 'Account balance has been topped up'}), 201
        else:
            return jsonify({'data': 'Account balance hasn\'t been changed'}), 500
    else:
        if create_current_account(generate_account_number(), amount, currency, card_number, uid): 
            return jsonify({'data': 'Account balance has been topped up'}), 201
        else:
            return jsonify({'data': 'Account balance hasn\'t been changed'}), 500

# Route to fetch all accounts associated with a specified credit card number
@current_account_blueprint.route('/api/accounts/getAccountsByCard', methods=['POST'])
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