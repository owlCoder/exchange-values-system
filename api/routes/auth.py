from flask import Blueprint, request
from flasgger import swag_from
from services.password_hasher import hash_method
from services.auth_service import auth_user, unauth_user

auth_blueprint = Blueprint("auth_blueprint", __name__)

class AuthBlueprintDocumentation:
    @auth_blueprint.route('/api/auth0/', methods=["POST"])
    def login():
        credentials = request.get_json()
        email = credentials['email']
        password_hash = hash_method(credentials['password'])
        response = auth_user(email, password_hash)
        
        return response

    @auth_blueprint.route('/api/auth0/logout/', methods=["POST"])
    def logout():
        credentials = request.get_json()
        uid = credentials['uid']
        token = credentials['token']

        return unauth_user(uid, token)
