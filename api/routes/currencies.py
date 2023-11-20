from flask import Blueprint, jsonify
from services.currencies_service import *

currencies_blueprint = Blueprint('currencies_blueprint', __name__)

class CurrenciesBlueprintDocumentation:
    """
    CurrenciesBlueprintDocumentation provides routes to fetch available currency information.

    Routes:
        - GET /api/currencies
            - Retrieve available currency codes.
        - GET /api/currencies/course
            - Retrieve detailed currency information.

    All routes return JSON responses.
    """

    @currencies_blueprint.route('/api/currencies', methods=['GET'])
    def get_available_currencies():
        """
        Retrieve available currency codes.

        Request:
            - Method: GET
            - Route: /api/currencies

        Returns:
            JSON: List of available currency codes.
        """
        currencies = GetAvailableCurrencies()
        return jsonify(currencies), 200

    @currencies_blueprint.route('/api/currencies/course', methods=['GET'])
    def get_available_currencies_course():
        """
        Retrieve detailed currency information.

        Request:
            - Method: GET
            - Route: /api/currencies/course

        Returns:
            JSON: Dictionary containing detailed currency information.
        """
        currencies_course = GetAvailableCurrenciesCourse()
        return jsonify(currencies_course), 200