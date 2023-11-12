from db_config import db
from models.token import Token

def create_token(token, user_email, user_uid):
    try:
        new_token = Token(token = token, email = user_email, uid = user_uid)
        db.session.add(new_token)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        db.session.rollback()
        return False


def is_token_valid(token, email):
    try:
        token_entry = db.session.query(Token).filter(Token.token == token, Token.email == email).first()
        if token_entry:
            # Token found, it is valid
            return True
        else:
            return False
    except Exception as e:
        return False


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