from flask import Blueprint, request
from services.password_hasher import hash_method
from services.auth_service import auth_user, unauth_user

auth_blueprint = Blueprint("auth_blueprint", __name__)

# Base Auth0 route to authenticate user with email and password
@auth_blueprint.route('/api/auth0/', methods = ["POST"])
def login():
    creditials = request.get_json()
    email = creditials['email']
    password_hash = hash_method(creditials['password'])
    response = auth_user(email, password_hash)
    
    return response

# Base Auth0 route to sign out user and remove a token
@auth_blueprint.route('/api/auth0/logout/', methods = ["POST"])
def logout():
    creditials = request.get_json()
    uid = creditials['uid']
    token = creditials['token']

    return unauth_user(uid, token)