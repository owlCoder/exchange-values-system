from flask import Blueprint, request
from services.password_hasher import hash_method
from services.auth_service import auth_user, unauth_user

auth_blueprint = Blueprint("auth_blueprint", __name__)

class AuthBlueprintDocumentation:
    """
    AuthBlueprintDocumentation provides authentication routes to validate and manage user sessions.

    Routes:
        - POST /api/auth0/
            - Authenticate user with email and password.
        - POST /api/auth0/logout/
            - Sign out user and remove a token.
    """

    @auth_blueprint.route('/api/auth0/', methods=["POST"])
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
