from flask import Blueprint, jsonify
from flasgger import Swagger, swag_from
from services.currencies_service import *
from config.exlude_docs_str import exclude_docstring
from flasgger import swag_from

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
    @swag_from({
        'tags': ['Currencies'],
        'summary': 'Retrieve available currency codes',
        'description': 'Endpoint to retrieve available currency codes.',
        'responses': {
            200: {
                'description': 'List of available currency codes'
            }
        }
    })
    @exclude_docstring
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
    @swag_from({
        'tags': ['Currencies'],
        'summary': 'Retrieve detailed currency information',
        'description': 'Endpoint to retrieve detailed currency information.',
        'responses': {
            200: {
                'description': 'Dictionary containing detailed currency information'
            }
        }
    })
    @exclude_docstring
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
