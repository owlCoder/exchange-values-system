from flask import Blueprint, request, jsonify
from controllers.credit_card import create_credit_card

credit_card_blueprint = Blueprint('credit_card_blueprint', __name__)

@credit_card_blueprint.route('/cards/create', methods=['POST'])
def create_credit_card_route():
    data = request.get_json()
    
    if create_credit_card(data):
        return jsonify({ 'data': 'Credit card info saved successfully' }), 200
    else:
        return jsonify({ 'data': 'Credit card info couldn\'t be saved. '}), 401
