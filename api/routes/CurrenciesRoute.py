from flask import Blueprint, jsonify
from services.CurrenciesService import *

currencies_blueprint = Blueprint('currencies_blueprint', __name__)

class CurrenciesBlueprint:
    @currencies_blueprint.route('/api/currencies', methods=['GET'])
    def get_available_currencies():
        currencies = get_available_currencies()
        return jsonify(currencies), 200

    @currencies_blueprint.route('/api/currencies/course', methods=['GET'])
    def get_available_currencies_course():
        currencies_course = get_available_currencies_course()
        return jsonify(currencies_course), 200
