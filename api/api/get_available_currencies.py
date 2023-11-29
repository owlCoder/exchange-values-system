import os
from flask import jsonify
import requests
import json
from http import HTTPStatus
from config.database import CURRENCY_API_URL
from services.currencies_service import get_available_currency

STATIC_FOLDER = "static"

def get_available_currencies(request):
    return {
        'status': HTTPStatus.OK,
        'body': jsonify(get_available_currency())  # Replace with your currency data
    }