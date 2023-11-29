from flask import json
from http.server import BaseHTTPRequestHandler
from services.currencies_service import get_available_currency

class handler(BaseHTTPRequestHandler):
    def currency(self):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        self.wfile.write((json.dumps(get_available_currency())).encode('utf-8'))
        return