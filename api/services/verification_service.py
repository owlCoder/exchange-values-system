from flask import jsonify
from controllers.user import update_user_verified_status
from controllers.credit_card import update_verified_field

# Service to verify user and user's credit card
def verify_user_credit_card(card_number, verified_status, uid):
    if not card_number or not verified_status or not uid:
        return False
    else:
        return update_verified_field(card_number, verified_status) \
           and update_user_verified_status(uid, True)
