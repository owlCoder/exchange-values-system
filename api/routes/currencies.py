from flask import Blueprint, jsonify
from services.currencies_service import *

currencies_blueprint = Blueprint('currencies_blueprint', __name__)

class CurrenciesBlueprintDocumentation:
    @currencies_blueprint.route('/api/currencies', methods=['GET'])
    def get_available_currencies():
        currencies = GetAvailableCurrencies()
        return jsonify(currencies), 200

    @currencies_blueprint.route('/api/currencies/course', methods=['GET'])
    def get_available_currencies_course():
        currencies_course = GetAvailableCurrenciesCourse()
        return jsonify(currencies_course), 200
