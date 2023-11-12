from models import User
from db_config import db

from sqlalchemy.orm.exc import NoResultFound

def get_user_by_id(user_id):
    try:
        user = db.session.query(User).get(user_id)
        if user:
            return {
                'uid': user.uid,
                'email': user.email,
                # Add more fields as needed
            }
        else:
            return None
    except NoResultFound as e:
        return None  # User not found
    except Exception as e:
        return None  # Handle other exceptions

