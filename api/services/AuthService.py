from flask import jsonify
from api.controllers.UserController import check_user_credetials_in_database, get_user_by_email, get_user_by_id
from api.controllers.TokenController import create_token, is_token_valid, delete_token
from api.utilities.TokenGenerator import generate_token

# Auth0 method to sign in user
def auth_user(email, password):
    if check_user_credetials_in_database(email, password):
        data = { "token": generate_token(), "uid": get_user_by_email(email), "user": get_user_by_id(get_user_by_email(email)) }

        if create_token(data):
            return jsonify({ 'token': data['token'], 'admin': data['user']['admin'], 'uid': data['uid'], 'verified': data['user']['verified'] }), 200
        else:
            return jsonify({'data': "Check your email and password. Auth service failed to create a token"}), 500
    else:
        return jsonify({'data': "Check your email and password and try again"}), 401
    
# Auth0 method to sign out user
def unauth_user(uid, token):
    if is_token_valid(token, uid):
        if delete_token(token):
            return jsonify({'data': "You have been signed out"}), 200
        else:
            return jsonify({'data': "Auth service failed to remove a session token"}), 500
    else:
        return jsonify({'data': "Invalid session token. Login again"}), 401