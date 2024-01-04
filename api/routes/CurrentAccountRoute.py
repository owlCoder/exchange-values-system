from flask import Blueprint, jsonify, request
from api.controllers.CurrentAccountController import *
from api.services.AccountGeneratorService import generate_account_number
from api.services.CurrenciesService import convert_currency

current_account_blueprint = Blueprint('current_account_blueprint', __name__)

class CurrentAccount:
    @current_account_blueprint.route('/api/account/topup', methods=['POST'])
    def top_up_current_account():
        data = request.get_json()
        request_account = CurrentAccount.deserialize(data)

        if not request_account:
            return jsonify({'data': 'Please provide valid data'}), 400
        
        account_id = check_account_exists_by_uid_cardnumber_currency(request_account.uid, request_account.card_number, request_account.currency)
        account = get_account_number_by_uid_and_cardnumber(request_account.uid, request_account.card_number)

        # If credit card has no active account, create a new one
        account_number = account.account_number if account else generate_account_number()

        if account_id:
            if update_account_balance(account_id, request_account.amount):
                return jsonify({'data': 'Account balance has been topped up'}), 201
            else:
                return jsonify({'data': 'Account balance hasn\'t been changed'}), 500
        else:
            if account_number and create_current_account(data): 
                return jsonify({'data': 'Account balance has been topped up'}), 201
            else:
                return jsonify({'data': 'Account balance hasn\'t been changed'}), 501


    @current_account_blueprint.route('/api/accounts/getAccountsByCard', methods=['POST'])
    def get_accounts_by_card_number():
        card_number = request.get_json().get('card_number')
        accounts = get_all_current_accounts_by_cardnumber(card_number)

        if accounts:
            return jsonify(accounts), 200
        else:
            return jsonify({'message': 'No current accounts'}), 404
        
    @current_account_blueprint.route('/api/account/exchange', methods=['POST'])
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
