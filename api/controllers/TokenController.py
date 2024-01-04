from models.user import User
from config.database import db
from models.token import Token

# Method to create a new token in database and create a new session
def create_token(token, user_email, user_uid):
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