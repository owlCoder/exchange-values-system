from flask import Blueprint, jsonify, request
from controllers.TransactionController import create_transaction

transaction_blueprint = Blueprint('transaction_blueprint', __name__)

class Transaction:
    @transaction_blueprint.route('/api/transactions/create', methods=['POST'])
    def CreateTransaction():
        data = request.get_json()

        if create_transaction(data):
            return jsonify({'data': 'Transaction has been created'}), 201
        else:
            return jsonify({'data': 'Failed to create a transaction'}), 500
