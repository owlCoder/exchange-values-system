from controllers.user import user_exists, get_user_by_email
from controllers.token import create_token
from services.token_generator import generate_token

def auth_user(email, password):
    if user_exists(email, password):
        token = generate_token()

        if create_token(token, email, get_user_by_email(email)):
            return token, 200
        else:
            return "Check your email and password. Auth service failed to create a token", 500
    else:
        return "Check your email and password and try again", 401