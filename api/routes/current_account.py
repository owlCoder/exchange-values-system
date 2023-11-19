from flask import Blueprint, request, jsonify
from controllers.current_account import *

current_account_blueprint = Blueprint('current_account_blueprint', __name__)

class CurrentAccountBlueprintDocumentation:
    """
    CurrentAccountBlueprintDocumentation provides routes to manage current account data.

    Routes:
        - POST /api/account/create
            - Create a new current account with user-submitted data.
        - POST /api/account/checkByUidAndCurrency
            - Check if the user has an existing account with the given UID and currency.
        - PUT /api/account/updateBalanceById
            - Update the balance of an account by its ID.

    All routes expect JSON payloads for data exchange.
    """
    
    @current_account_blueprint.route('/api/account/create', methods=['POST'])
    def create_current_account_route():
        """
        Create a new current account with data submitted by the user.

        Request:
            - Method: POST
            - Route: /api/account/create
            - Payload: JSON object containing current account information

        Returns:
            JSON: Response indicating success or failure of current account creation.
        """
        data = request.get_json()

        account_id = create_current_account(
            data.get('account_number'),
            data.get('balance'),
            data.get('currency'),
            data.get('card_number'),
            data.get('uid')
        )

        if account_id:
            return jsonify({ 'data': f'Account created successfully with ID: {account_id}'}), 200
        else:
            return jsonify({ 'data': 'Account creation failed. Check entered information'}), 401


    @current_account_blueprint.route('/api/account/checkByUidAndCurrency', methods=['POST'])
    def check_account_by_uid_and_currency():
        """
        Check if the user has an existing account with the given UID and currency.

        Request:
            - Method: POST
            - Route: /api/account/checkByUidAndCurrency
            - Payload: JSON object containing 'uid' and 'currency'

        Returns:
            JSON: Response indicating whether the account exists or not.
        """
        uid = request.get_json().get('uid')
        currency = request.get_json().get('currency')

        account_id = check_account_exists(uid, currency)

        if account_id:
            return jsonify({ 'data': f'Account exists with ID: {account_id}'}), 200
        else:
            return jsonify({ 'data': 'Account does not exist. Check entered information'}), 401


    @current_account_blueprint.route('/api/account/updateBalanceById', methods=['PUT'])
    def update_balance_by_id():
        """
        Update the balance of an account by its ID.

        Request:
            - Method: PUT
            - Route: /api/account/updateBalanceById
            - Payload: JSON object containing 'account_id' and 'new_balance'

        Returns:
            JSON: Response indicating success or failure of updating the account balance.
        """
        data = request.get_json()
        account_id = data.get('account_id')
        new_balance = data.get('new_balance')

        if update_account_balance(account_id, new_balance):
            return jsonify({'data': 'Account balance updated successfully'}), 200
        else:
            return jsonify({'data': 'Failed to update account balance. Check entered information'}), 403
