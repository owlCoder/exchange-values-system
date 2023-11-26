from flask import Blueprint, jsonify, request
from controllers.token import is_token_valid, delete_token

token_blueprint = Blueprint('token_blueprint', __name__)

class TokenBlueprintDocumentation:
    @token_blueprint.route('/api/token/check', methods=['POST'])
    def check_token():
        token = request.json.get('token')
        uid = request.json.get('uid')

        valid, verified = is_token_valid(token, uid)
        if valid:
            return jsonify({'data': verified}), 200
        else:
            return jsonify({'data': 'Token is not valid'}), 401

    @token_blueprint.route('/api/token/delete', methods=['DELETE'])
    def delete_token_route():
        token = request.json.get('token')

        if delete_token(token):
            return jsonify({'data': 'Token deleted successfully'}), 200
        else:
            return jsonify({'data': 'Token not found or deletion failed'}), 404
