from flask import Blueprint, jsonify, request
from controllers.user import *
from services.email_verifiaction import send_email
from services.password_hasher import hash_method

user_blueprint = Blueprint('user_blueprint', __name__)

# Route to create a new user
@user_blueprint.route('/api/user/create', methods=['POST'])
def create_user():
    new_user_data = request.get_json()
    email = new_user_data.get('email')
    password = new_user_data.get('password')

    # Always save hashed passwords in database
    new_user_data['password'] = hash_method(new_user_data['password'])

    if create_new_user(new_user_data):
        if send_email(email, email, password):
            return 'User created successfully', 201
        else:
            return 'User can\'n be created. Check entered data', 400
    else:
        return 'User can\'n be created. Entered email address already registered', 401

# Route to get specific user by user ID
@user_blueprint.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user_data = get_user_by_id(user_id)

    if user_data:
        return jsonify(user_data), 200
    else:
        return 'User not found', 404

# Route to get all users in database
@user_blueprint.route('/api/users', methods=['GET'])
def get_all_users():
    users = get_all_users_data()

    if users:
        return jsonify(users), 200
    else:
        return 'No users found', 404
    
# Route to update specific user by user ID
@user_blueprint.route('/api/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    new_user_data = request.get_json()  # The updated data is in the request

    if update_user_data(user_id, new_user_data):
        return 'User updated successfully', 200
    else:
        return 'User not found or update failed', 404
