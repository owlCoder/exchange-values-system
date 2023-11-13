from flask import jsonify
from controllers.user import user_exists, get_user_by_email, get_user_by_id
from controllers.token import create_token, is_token_valid, delete_token
from services.token_generator import generate_token

def auth_user(email, password):
    if user_exists(email, password):
        token = generate_token()
        uid = get_user_by_email(email)
        user = get_user_by_id(uid)
        
        if create_token(token, email, uid):
            return jsonify({ 'token': token, 'admin': user['admin'], 'uid': uid, 'verified': user['verified'] }), 200
        else:
            return jsonify({'data': "Check your email and password. Auth service failed to create a token"}), 500
    else:
        return jsonify({'data': "Check your email and password and try again"}), 401
    

def unauth_user(uid, token):
    if is_token_valid(token, uid):
        if delete_token(token):
            return jsonify({'data': "You have been signed out"}), 200
        else:
            return jsonify({'data': "Auth service failed to remove a session token"}), 500
    else:
        return jsonify({'data': "Invalid session token. Login again"}), 401