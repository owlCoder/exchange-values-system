from flask import Blueprint, request, jsonify
from controllers.credit_card import create_credit_card, check_credit_card_by_uid

credit_card_blueprint = Blueprint('credit_card_blueprint', __name__)

@credit_card_blueprint.route('/api/cards/create', methods=['POST'])
def create_credit_card_route():
    data = request.get_json()

    if create_credit_card(data):
        return jsonify({ 'data': 'Credit card info saved successfully' }), 200
    else:
        return jsonify({ 'data': 'Credit card info couldn\'t be saved. Check entered information'}), 401


@credit_card_blueprint.route('/api/cards/checkByUid', methods=['POST'])
def exist_credit_card_route():
    uid = request.get_json().get('uid')

    if check_credit_card_by_uid(uid):
        return jsonify({ 'data': 'Exists' }), 200
    else:
        return jsonify({ 'data': 'Credit card info doesn\'t exist. Check entered information'}), 401
