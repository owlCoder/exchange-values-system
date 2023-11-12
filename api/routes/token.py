from flask import Blueprint, jsonify, request
from controllers.token import is_token_valid, delete_token

token_blueprint = Blueprint('token_blueprint', __name__)

@token_blueprint.route('/api/token/check', methods=['POST'])
def check_token():
    token = request.json.get('token')

    if is_token_valid(token):
        return 'Token is valid', 200
    else:
        return 'Token is not valid', 401


@token_blueprint.route('/api/token/delete', methods=['DELETE'])
def delete_token():
    token = request.json.get('token')

    if delete_token(token):
        return 'Token deleted successfully', 200
    else:
        return 'Token not found or deletion failed', 404