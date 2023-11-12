from models.user import User
from db_config import db
from sqlalchemy.orm.exc import NoResultFound

def user_exists(email, hashed_password):
 
    user = db.session.query(User).filter(User.email == email, User.password == hashed_password).first()
    return user is not None  # Return True if user exists, False otherwise


def get_user_by_id(user_id):
    try:
        user = db.session.query(User).get(user_id)
        if user:
            return {
                "uid": user.uid,
                "first_name": user.first_name,
                "surname": user.surname,
                "address": user.address,
                "city": user.city,
                "country": user.country,
                "phone_number": user.phone_number,
                "email": user.email,
                "admin": user.admin,
                "verified": user.verified,
            }
        else:
            return None
    except NoResultFound as e:
        return None  # User not found
    except Exception as e:
        return None  # Handle other exceptions

def get_user_by_email(email):
    try:
        user = db.session.query(User).filter(User.email == email).first()
        if user:
            return user.uid
        else:
            return None
    except NoResultFound as e:
        return None  # User not found
    except Exception as e:
        return None  # Handle other exceptions

def get_all_users_data():
    try:
        users = db.session.query(User).all()
        user_list = []
        for user in users:
            user_list.append(
                {
                    "uid": user.uid,
                    "first_name": user.first_name,
                    "surname": user.surname,
                    "address": user.address,
                    "city": user.city,
                    "country": user.country,
                    "phone_number": user.phone_number,
                    "email": user.email,
                    "admin": user.admin,
                    "verified": user.verified,
                }
            )
        return user_list
    except Exception as e:
        return None


def update_user_data(user_id, new_data):
    try:
        user = db.session.query(User).get(user_id)
        if user:
            user.first_name = new_data.get("first_name", user.first_name)
            user.surname = new_data.get("surname", user.surname)
            user.address = new_data.get("address", user.address)
            user.city = new_data.get("city", user.city)
            user.country = new_data.get("country", user.country)
            user.phone_number = new_data.get("phone_number", user.phone_number)
            user.email = new_data.get("email", user.email)
            user.admin = new_data.get("admin", user.admin)
            user.verified = new_data.get("verified", user.verified)

            db.session.commit()
            return True
        else:
            return False
    except Exception as e:
        db.session.rollback()
        return False


def create_new_user(new_data):
    try:
        new_user = User(
            first_name = new_data.get("first_name"),
            surname = new_data.get("surname"),
            address = new_data.get("address"),
            city = new_data.get("city"),
            country = new_data.get("country"),
            phone_number = new_data.get("phone_number"),
            email = new_data.get("email"),
            admin =new_data.get("admin"),
            verified = new_data.get("verified"),
        )

        db.session.add(new_user)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False
