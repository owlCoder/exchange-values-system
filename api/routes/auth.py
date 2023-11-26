from flask import Blueprint, request
from flasgger import swag_from
from services.password_hasher import hash_method
from services.auth_service import auth_user, unauth_user
from config.exlude_docs_str import exclude_docstring
from flasgger import swag_from

auth_blueprint = Blueprint("auth_blueprint", __name__)

class AuthBlueprintDocumentation:
    @auth_blueprint.route('/api/auth0/', methods=["POST"])
    @swag_from({
        'tags': ['Authentication'],
        'summary': 'Authenticate user with email and password',
        'description': 'Endpoint to authenticate a user using email and password.',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'email': {
                            'type': 'string'
                        },
                        'password': {
                            'type': 'string'
                        }
                    }
                }
            }
        ],
        'responses': {
            200: {
                'description': 'User authenticated successfully.'
            }
        }
    })
    @exclude_docstring
    def login():
        """
        Authenticate user with email and password.

        Request:
            - Method: POST
            - Route: /api/auth0/
            - Payload: JSON object containing 'email' and 'password'

        Returns:
            JSON: Response containing user authentication status and details.
        """
        credentials = request.get_json()
        email = credentials['email']
        password_hash = hash_method(credentials['password'])
        response = auth_user(email, password_hash)
        
        return response

    @auth_blueprint.route('/api/auth0/logout/', methods=["POST"])
    @swag_from({
        'tags': ['Authentication'],
        'summary': 'Sign out user and remove a token',
        'description': 'Endpoint to sign out a user and remove their token.',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'required': True,
                'schema': {
                    'type': 'object',
                    'properties': {
                        'uid': {
                            'type': 'string'
                        },
                        'token': {
                            'type': 'string'
                        }
                    }
                }
            }
        ],
        'responses': {
            200: {
                'description': 'User signed out successfully.'
            }
        }
    })
    @exclude_docstring
    def logout():
        """
        Sign out user and remove a token.

        Request:
            - Method: POST
            - Route: /api/auth0/logout/
            - Payload: JSON object containing 'uid' and 'token'

        Returns:
            str: Response indicating the status of user sign out.
        """
        credentials = request.get_json()
        uid = credentials['uid']
        token = credentials['token']

        return unauth_user(uid, token)
