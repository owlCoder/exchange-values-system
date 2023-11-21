from models.user import User
from config.database import db
from models.token import Token

# Method to create a new token in database and create a new session
def create_token(token, user_email, user_uid):
    """
    Create a new token in the database and create a new session.

    Args:
        token (str): The token string to be stored.
        user_email (str): Email associated with the user.
        user_uid (int): User ID associated with the token.

    Returns:
        bool: True if the token is successfully created and session created, False otherwise.

    Example:
        result = create_token('sample_token_string', 'user@example.com', 1)
        print(result)  # True or False
    """
    try:
        new_token = Token(token = token, email = user_email, uid = user_uid)
        db.session.add(new_token)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

# Method to check is token still valid
def is_token_valid(token, uid):
    """
    Check if the token is still valid for a specific user ID.

    Args:
        token (str): The token string to be checked.
        uid (int): The user ID.

    Returns:
        tuple: A tuple containing (validity_status, user_verified_status). 
               Returns (False, False) if an error occurs.

    Example:
        validity, verified = is_token_valid('sample_token_string', 1)
        print(validity, verified)  # True/False for token validity and user verified status
    """
    try:
        token_entry = db.session.query(Token).filter(Token.token == token, Token.uid == uid).first()
        if token_entry:
            # Token found, it is valid, send also user status
            verified = db.session.query(User.verified).filter(User.uid == uid).scalar()
            return True, verified
        else:
            return False
    except Exception as e:
        return False
    
# Method to delete token from database
def delete_token(token):
    """
    Delete a token from the database.

    Args:
        token (str): The token string to be deleted.

    Returns:
        bool: True if the token is found and successfully deleted, False otherwise.

    Example:
        result = delete_token('sample_token_string')
        print(result)  # True or False
    """
    try:
        token_entry = db.session.query(Token).filter(Token.token == token).first()
        if token_entry:
            # Token found, delete it
            db.session.delete(token_entry)
            db.session.commit()
            return True
        else:
            return False
    except Exception as e:
        db.session.rollback()
        return False