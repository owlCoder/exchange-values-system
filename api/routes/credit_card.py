from flask import Blueprint, request, jsonify
from controllers.credit_card import *

credit_card_blueprint = Blueprint('credit_card_blueprint', __name__)

# Route to create a new credit card with data submitted by user
@credit_card_blueprint.route('/api/cards/create', methods=['POST'])
def create_credit_card_route():
    data = request.get_json()

    if create_credit_card(data):
        return jsonify({ 'data': 'Credit card info saved successfully' }), 200
    else:
        return jsonify({ 'data': 'Credit card info couldn\'t be saved. Check entered information'}), 401

# Route to check if user has at least one credit card in database
@credit_card_blueprint.route('/api/cards/checkByUid', methods=['POST'])
def exist_credit_card_route():
    uid = request.get_json().get('uid')

    if check_credit_card_by_uid(uid):
        return jsonify({ 'data': 'Exists' }), 200
    else:
        return jsonify({ 'data': 'Credit card info doesn\'t exist. Check entered information'}), 401

# Route to get all credit cards owned by user with uid
@credit_card_blueprint.route('/api/cards/getCardsByUid', methods=['POST'])
def get_credit_cards_by_uid():
    uid = request.get_json().get('uid')
    credit_cards = get_all_credit_cards_by_uid(uid)

    if credit_cards is not None:
        return jsonify(credit_cards), 200
    else:
        return jsonify({'data': 'Error retrieving credit cards by uid'}), 500

# Route to update verified field by card number
@credit_card_blueprint.route('/api/cards/updateVerified', methods=['PUT'])
def update_verified():
    data = request.get_json()
    card_number = data.get('card_number')
    verified_status = data.get('verified')

    if update_verified_field(card_number, verified_status):
        return jsonify({'data': 'Verified field updated successfully'}), 200
    else:
        return jsonify({'data': 'Error updating verified field'}), 500