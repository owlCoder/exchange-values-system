from flask import Blueprint, jsonify, request
from controllers.current_account import *
from services.account_number_generator import generate_account_number

current_account_blueprint = Blueprint('current_account_blueprint', __name__)

@current_account_blueprint.route('/api/account/topup', methods=['POST'])
def top_up_current_account():
    data = request.get_json()
    card_number = data.get('card_number')
    uid = data.get('uid')
    amount = data.get('amount')
    currency = data.get('currency')

    if not card_number or not uid or not amount or not currency:
        return jsonify({'data': 'Please provide valid data'}), 400
    
    account_id = check_account_exists(uid, currency)

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
