from models.user import User
from config.database import db
from sqlalchemy.orm.exc import NoResultFound

# Method to create a new user
def create_new_user(new_data):
    """
    Create a new user with the provided data.

    Args:
        new_data (dict): A dictionary containing user details.

    Returns:
        bool: True if the user is successfully created, False otherwise.

    Example:
        data = {
            "first_name": "John",
            "surname": "Doe",
            "address": "123 Main St",
            "city": "New York",
            "country": "USA",
            "phone_number": "123-456-7890",
            "email": "john@example.com",
            "password": "password"
        }
        result = create_new_user(data)
        print(result)  # True or False
    """
    try:
        new_user = User(
            first_name = new_data.get("first_name"),
            surname = new_data.get("surname"),
            address = new_data.get("address"),
            city = new_data.get("city"),
            country = new_data.get("country"),
            phone_number = new_data.get("phone_number"),
            email = new_data.get("email"),
            password = new_data.get("password"),
            admin =False,
            verified = False,
        )

        db.session.add(new_user)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

# Method to check if user exists in system with entered email and passwords
def user_exists(email, hashed_password):
    """
    Check if a user exists in the system with the provided email and hashed password.

    Args:
        email (str): Email address of the user.
        hashed_password (str): Hashed password of the user.

    Returns:
        bool: True if the user exists, False otherwise.

    Example:
        exists = user_exists('john@example.com', 'hashed_password')
        print(exists)  # True or False
    """
    user = db.session.query(User).filter(User.email == email, User.password == hashed_password).first()
    return user is not None  # Return True if user exists, False otherwise

# Method to get user by user ID
def get_user_by_id(user_id):
    """
    Get a user by user ID.

    Args:
        user_id (int): ID of the user to retrieve.

    Returns:
        dict or None: Serialized user data if the user exists, otherwise None.

    Example:
        user_data = get_user_by_id(1)
        print(user_data)  # {'first_name': 'John', 'surname': 'Doe', ...} or None
    """
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
    """
    Get a user by email address.

    Args:
        email (str): Email address of the user to retrieve.

    Returns:
        int or None: User ID if the user exists with the given email, otherwise None.

    Example:
        user_id = get_user_by_email('john@example.com')
        print(user_id)  # 1 or None
    """
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
def get_all_users_data():
    """
    Get all users from the database.

    Returns:
        list or None: List of serialized user data if users exist, otherwise None.

    Example:
        all_users = get_all_users_data()
        print(all_users)  # [{'first_name': 'John', 'surname': 'Doe', ...}, ...] or None
    """
    try:
        users = db.session.query(User).all()
        return [user.serialize() for user in users]
    except Exception as e:
        return None

# Method to update a user by user ID
def update_user_data(user_id, new_data):
    """
    Update a user's data by user ID.

    Args:
        user_id (int): ID of the user to update.
        new_data (dict): New data to update for the user.

    Returns:
        bool: True if the user is successfully updated, False otherwise.

    Example:
        result = update_user_data(1, {"first_name": "Jane", "surname": "Doe"})
        print(result)  # True or False
    """
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
            user.password = new_data.get("password", user.password)

            db.session.commit()
            return True
        else:
            return False
    except Exception as e:
        db.session.rollback()
        return False

# Method to update verified status
def update_user_verified(user_id, new_verified_status):
    """
    Update verified status for a user by user ID.

    Args:
        user_id (int): ID of the user to update.
        new_verified_status (bool): New verified status for the user.

    Returns:
        bool: True if the user's verified status is successfully updated, False otherwise.

    Example:
        result = update_user_verified(1, True)
        print(result)  # True or False
    """
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
    """
    Delete a user from the database using the email.

    Args:
        email (str): Email address of the user to be deleted.

    Returns:
        bool: True if the user is successfully deleted, False otherwise.

    Example:
        result = delete_user_by_email('john@example.com')
        print(result)  # True or False
    """
    try:
        # Query the database for the user by email
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