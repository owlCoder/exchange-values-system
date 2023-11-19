from flask import jsonify
from controllers.user import user_exists, get_user_by_email, get_user_by_id
from controllers.token import create_token, is_token_valid, delete_token
from services.token_generator import generate_token

# Auth0 method to sign in user
def auth_user(email, password):
    """
    Authenticates a user using email and password, generates a token, and creates a session.

    Args:
        email (str): User's email address for authentication.
        password (str): User's password for authentication.

    Returns:
        jsonify: Returns a JSON response containing the generated token, user's admin status, user ID (uid),
                 and verification status (verified).
                 HTTP status code 200 for successful authentication, 401 for authentication failure,
                 and 500 for internal server error.
    """
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
    
# Auth0 method to sign out user
def unauth_user(uid, token):
    """
    Signs out a user by removing the session token.

    Args:
        uid (int): User ID (uid) for identifying the user.
        token (str): Session token to be deleted.

    Returns:
        jsonify: Returns a JSON response indicating the success or failure of signing out.
                 HTTP status code 200 for successful sign-out, 401 for invalid session token,
                 and 500 for internal server error.
    """
    if is_token_valid(token, uid):
        if delete_token(token):
            return jsonify({'data': "You have been signed out"}), 200
        else:
            return jsonify({'data': "Auth service failed to remove a session token"}), 500
    else:
        return jsonify({'data': "Invalid session token. Login again"}), 401