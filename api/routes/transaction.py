from flask import Blueprint, jsonify, request
from controllers.transaction import create_transaction

transaction_blueprint = Blueprint('transaction_blueprint', __name__)

@transaction_blueprint.route('/api/transactions/create', methods=['POST'])
def CreateTransaction():
    data = request.get_json()
    sender_uid = data.get('sender_uid') 
    sender_account_id = data.get('sender_account_id')
    amount = data.get('amount') 
    receiver_account_number = data.get('receiver_account_number') 
    receiver_email = data.get('receiver_email') 
    receiver_name = data.get('receiver_name') 
    receiver_surname = data.get('receiver_surname') 
    approved = data.get('approved')

    if create_transaction(sender_uid, sender_account_id, amount, receiver_account_number, receiver_email, receiver_name, receiver_surname, approved):
        return jsonify({'data': 'Transaction has been created'}), 201
    else:
        return jsonify({'data': 'Failed to create a transaction'}), 500
