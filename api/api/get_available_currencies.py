from flask import json
from http.server import BaseHTTPRequestHandler
from services.currencies_service import get_available_currency

def handler(request):
    # Process the request
    name = request.query.get('name') or 'Guest'

    # Return the response
    return {
        'statusCode': 200,
        'body': f'Hello, {name}!'
    }
