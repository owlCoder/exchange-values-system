from flask import Blueprint, jsonify, request
from services.password_hasher import hash_method
from services.auth import auth_user

auth_blueprint = Blueprint("auth_blueprint", __name__)

@auth_blueprint.route('/api/auth0/', methods = ["POST"])
def login():
    creditials = request.get_json()
    email = creditials['email']
    password_hash = hash_method(creditials['password'])

    return auth_user(email, password_hash)