from flask import Blueprint, request, jsonify
from services.verification_service import verify_user_credit_card
from controllers.credit_card import *

credit_card_blueprint = Blueprint('credit_card_blueprint', __name__)

class CreditCardBlueprintDocumentation:
    """
    CreditCardBlueprintDocumentation provides routes to manage credit card data.

    Routes:
        - POST /api/cards/create
            - Create a new credit card with user-submitted data.
        - POST /api/cards/checkByUid
            - Check if the user has at least one credit card in the database.
        - POST /api/cards/getCardsByUid
            - Get all credit cards owned by a user.
        - PUT /api/cards/updateVerified
            - Update the 'verified' field by card number.

    All routes expect JSON payloads for data exchange.
    """
    
    @credit_card_blueprint.route('/api/cards/create', methods=['POST'])
    def create_credit_card_route():
        """
        Create a new credit card with data submitted by the user.

        Request:
            - Method: POST
            - Route: /api/cards/create
            - Payload: JSON object containing credit card information

        Returns:
            JSON: Response indicating success or failure of credit card creation.
        """
        data = request.get_json()

        if create_credit_card(data):
            return jsonify({ 'data': 'Credit card info saved successfully' }), 200
        else:
            return jsonify({ 'data': 'Credit card info couldn\'t be saved. Check entered information'}), 401


    @credit_card_blueprint.route('/api/cards/checkByUid', methods=['POST'])
    def exist_credit_card_route():
        """
        Check if the user has at least one credit card in the database.

        Request:
            - Method: POST
            - Route: /api/cards/checkByUid
            - Payload: JSON object containing 'uid'

        Returns:
            JSON: Response indicating whether credit card exists or not.
        """
        uid = request.get_json().get('uid')

        if check_credit_card_by_uid(uid):
            return jsonify({ 'data': 'Exists' }), 200
        else:
            return jsonify({ 'data': 'Credit card info doesn\'t exist. Check entered information'}), 401


    @credit_card_blueprint.route('/api/cards/getCardsByUid', methods=['POST'])
    def get_credit_cards_by_uid():
        """
        Get all credit cards owned by a user with a specific UID.

        Request:
            - Method: POST
            - Route: /api/cards/getCardsByUid
            - Payload: JSON object containing 'uid'

        Returns:
            JSON: List of credit card details or an error message.
        """
        uid = request.get_json().get('uid')
        credit_cards = get_all_credit_cards_by_uid(uid)

        if credit_cards is not None:
            return jsonify(credit_cards), 200
        else:
            return jsonify({'data': 'Error retrieving credit cards by uid'}), 500


    @credit_card_blueprint.route('/api/cards/updateVerified', methods=['PUT'])
    def update_verified():
        """
        Update the 'verified' field by card number.

        Request:
            - Method: PUT
            - Route: /api/cards/updateVerified
            - Payload: JSON object containing 'card_number', 'verified', and 'uid'

        Returns:
            JSON: Response indicating success or failure of updating verified status.
        """
        data = request.get_json()
        card_number = data.get('card_number')
        verified_status = data.get('verified')
        uid = data.get('uid')

        if verify_user_credit_card(card_number, verified_status, uid):
            return jsonify({'data': 'Verified status updated successfully'}), 200
        else:
            return jsonify({'data': 'Error updating verified status'}), 403
