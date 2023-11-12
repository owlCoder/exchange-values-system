from flask import Blueprint, jsonify, request
from controllers.user import *

user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user_data = get_user_by_id(user_id)

    if user_data:
        return jsonify(user_data), 200
    else:
        return 'User not found', 404


@user_blueprint.route('/api/users', methods=['GET'])
def get_all_users():
    users = get_all_users_data()

    if users:
        return jsonify(users), 200
    else:
        return 'No users found', 404
    

@user_blueprint.route('/api/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    new_user_data = request.get_json()  # The updated data is in the request

    if update_user_data(user_id, new_user_data):
        return 'User updated successfully', 200
    else:
        return 'User not found or update failed', 404
    

@user_blueprint.route('/api/user', methods=['POST'])
def create_user():
    new_user_data = request.get_json()

    if create_new_user(new_user_data):
        return 'User created successfully', 201
    else:
        return 'User creation failed', 400