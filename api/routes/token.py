from flask import Blueprint, jsonify, request
from flasgger import swag_from
from controllers.token import is_token_valid, delete_token
from config.exlude_docs_str import exclude_docstring
from flasgger import swag_from
from config.socket import handle_data_update

token_blueprint = Blueprint('token_blueprint', __name__)

class TokenBlueprintDocumentation:
    """
    TokenBlueprintDocumentation provides routes to manage tokens and sessions.

    Routes:
        - POST /api/token/check
            - Check token and session validity.
        - DELETE /api/token/delete
            - Revoke a session and remove the token from the database.

    All routes expect JSON payloads for data exchange.
    """

    @token_blueprint.route('/api/token/check', methods=['POST'])
    @swag_from({
        'tags': ['Token'],
        'summary': 'Check token and session validity',
        'description': 'Endpoint to check token and session validity.',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'token': {'type': 'string'},
                        'uid': {'type': 'integer'}
                    },
                    'required': ['token', 'uid']
                }
            }
        ],
        'responses': {
            200: {'description': 'Response indicating whether the token is valid or not'},
            401: {'description': 'Token is not valid'}
        }
    })
    @exclude_docstring
    def check_token():
        """
        Check token and session validity.

        Request:
            - Method: POST
            - Route: /api/token/check
            - Payload: JSON object containing 'token' and 'uid'

        Returns:
            JSON: Response indicating whether the token is valid or not.
        """
        token = request.json.get('token')
        uid = request.json.get('uid')

        valid, verified = is_token_valid(token, uid)
        if valid:
            return jsonify({'data': verified}), 200
        else:
            return jsonify({'data': 'Token is not valid'}), 401

    @token_blueprint.route('/api/token/delete', methods=['DELETE'])
    @swag_from({
        'tags': ['Token'],
        'summary': 'Revoke a session and remove the token from the database',
        'description': 'Endpoint to revoke a session and remove the token from the database.',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'token': {'type': 'string'}
                    },
                    'required': ['token']
                }
            }
        ],
        'responses': {
            200: {'description': 'Token deleted successfully'},
            404: {'description': 'Token not found or deletion failed'}
        }
    })
    @exclude_docstring
    def delete_token_route():
        """
        Revoke a session and remove the token from the database.

        Request:
            - Method: DELETE
            - Route: /api/token/delete
            - Payload: JSON object containing 'token'

        Returns:
            JSON: Response indicating success or failure of token deletion.
        """
        token = request.json.get('token')

        if delete_token(token):
            return jsonify({'data': 'Token deleted successfully'}), 200
        else:
            return jsonify({'data': 'Token not found or deletion failed'}), 404
