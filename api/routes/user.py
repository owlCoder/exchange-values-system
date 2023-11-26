from flask import Blueprint, jsonify, request
from controllers.user import *
from services.email_service import get_email_sender_instance
from services.email_message import activation_message
from services.password_hasher import hash_method

user_blueprint = Blueprint('user_blueprint', __name__)

class UserBlueprintDocumentation:
    @user_blueprint.route('/api/user/create', methods=['POST'])
    def create_user():
        new_user_data = request.get_json()
        email = new_user_data.get('email')
        password = new_user_data.get('password')

        # Always save hashed passwords in database
        new_user_data['password'] = hash_method(new_user_data['password'])
        
        if create_new_user(new_user_data):
            if get_email_sender_instance().prepare(email, activation_message(email, password), 'Account Registration'):
                return jsonify({ 'data': 'User created successfully'}), 201
            else:
                # Email send failed so delete created user
                #delete_user_by_email(email)
                return jsonify({ 'data': 'User can\'t be created. Check entered data'}), 401
        else:
            return jsonify({ 'data': 'User can\'t be created. Entered email address already registered'}), 400

    @user_blueprint.route('/api/user/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        user_data = get_user_by_id(user_id)

        if user_data:
            return jsonify(user_data), 200
        else:
            return jsonify({ 'data': 'User not found'}), 404

    @user_blueprint.route('/api/users', methods=['GET'])
    def get_all_users():
        users = get_all_users()

        if users:
            return jsonify(users), 200
        else:
            return jsonify({ 'data': 'No users found'}), 404
    
    @user_blueprint.route('/api/user/<int:user_id>', methods=['PUT'])
    def update_user(user_id):
        new_user_data = request.get_json()  # The updated data is in the request

        if update_user(user_id, new_user_data):
            return jsonify({ 'data': 'User updated successfully'}), 200
        else:
            return jsonify({ 'data': 'Profile info can\'t be updated. Check entered email'}), 404
