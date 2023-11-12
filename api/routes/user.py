from flask import Blueprint, jsonify
from controllers.user import get_user_by_id

user_blueprint = Blueprint('user_blueprint', __name__)

@user_blueprint.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user_data = get_user_by_id(user_id)
    print(user_data)
    if user_data:
        return jsonify(user_data), 200
    else:
        return 'User not found', 404