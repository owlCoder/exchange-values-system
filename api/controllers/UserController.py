from models.User import User
from configuration.DatabaseInitializator import db
from sqlalchemy.orm.exc import NoResultFound

# Method to create a new user
def create_new_user(new_data):
    try:
        db.session.add(User.deserialize(new_data))
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

# Method to check if user exists in system with entered email and passwords
def check_user_credetials_in_database(email, hashed_password):
    try:
        user = db.session.query(User).filter(User.email == email, User.password == hashed_password).first()
        return user is not None  # Return True if user exists, False otherwise
    except Exception as e:
        return False
    
# Method to get user by user ID
def get_user_by_id(user_id):
    try:
        user = db.session.query(User).get(user_id)
        if user:
            return user.serialize()
        else:
            return None
    except NoResultFound as e:
        return None  # User not found
    except Exception as e:
        return None  # Handle other exceptions

# Method to get a user by email address
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

# Method to get all users from database
def get_all_users():
    try:
        users = db.session.query(User).all()
        return [user.serialize() for user in users]
    except Exception as e:
        return None

# Method to update a user by user ID
def update_user(user_id, new_data):
    try:
        user = db.session.query(User).get(user_id)
        new_data_user = User.deserialize(new_data)

        if user:
            user.first_name = new_data_user.first_name
            user.surname = new_data_user.surname
            user.address = new_data_user.address
            user.city = new_data_user.city
            user.country = new_data_user.country
            user.phone_number = new_data_user.phone_number
            user.email = new_data_user.email
            user.password = new_data_user.password

            db.session.commit()
            return True
        else:
            return False
    except Exception as e:
        db.session.rollback()
        return False

# Method to update verified status
def update_user_verified_status(user_id, new_verified_status):
    try:
        user = db.session.query(User).get(user_id)
        if user:
            user.verified = new_verified_status
            db.session.commit()
            return True
        else:
            return False
    except Exception as e:
        db.session.rollback()
        return False

# Method to delete a user by email
def delete_user_by_email(email):
    try:
        user = db.session.query(User).filter(User.email == email).first()

        if user:
            # If the user exists, delete it from the database
            db.session.delete(user)
            db.session.commit()
            return True  # Return True indicating successful deletion
        else:
            return False  # Return False if user does not exist
    except Exception as e:
        db.session.rollback()
        return False  # Return False for any exception during deletion