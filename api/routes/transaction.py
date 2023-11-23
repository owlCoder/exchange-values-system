from flask import Blueprint, jsonify, request
from flasgger import swag_from
from controllers.transaction import create_transaction
from config.exlude_docs_str import exclude_docstring

transaction_blueprint = Blueprint('transaction_blueprint', __name__)

@transaction_blueprint.route('/api/transactions/create', methods=['POST'])
@swag_from({
    'tags': ['Transactions'],
    'summary': 'Create a new transaction',
    'description': 'Endpoint to create a new transaction record with provided details.',
    'parameters': [
        {
            'name': 'transaction_details',
            'in': 'body',
            'description': 'Details for the transaction',
            'schema': {
                'type': 'object',
                'properties': {
                    'sender_uid': {'type': 'integer', 'description': "Sender's user ID"},
                    'sender_account_id': {'type': 'integer', 'description': "Sender's account ID"},
                    'amount': {'type': 'number', 'description': 'Amount involved in the transaction'},
                    'receiver_account_number': {'type': 'string', 'description': "Receiver's account number"},
                    'receiver_email': {'type': 'string', 'format': 'email', 'description': "Receiver's email address"},
                    'receiver_name': {'type': 'string', 'description': "Receiver's name"},
                    'receiver_surname': {'type': 'string', 'description': "Receiver's surname"},
                    'approved': {'type': 'string', 'enum': ['ON HOLD', 'APPROVED', 'DENIED'], 'description': 'Status of the transaction'}
                },
                'required': ['sender_uid', 'sender_account_id', 'amount', 'receiver_account_number', 'receiver_email', 'receiver_name', 'receiver_surname', 'approved']
            }
        }
    ],
    'responses': {
        201: {'description': 'Transaction has been created'},
        500: {'description': 'Failed to create a transaction'}
    }
})
@exclude_docstring
def CreateTransaction():
    """
    Endpoint to create a new transaction.

    This endpoint allows the creation of a new transaction record with provided details.

    Returns:
        JSON: Response indicating the status of the transaction creation.
    """
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
