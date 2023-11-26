from flask import jsonify
from controllers.user import update_user_verified_status
from controllers.credit_card import update_verified_field

# Service to verify user and user's credit card
def verify_user_credit_card(card_number, verified_status, uid):
    """
    Verifies the user's credit card and the user by updating their verification status.

    Args:
        card_number (str): The credit card number.
        verified_status (bool): The verification status for the credit card.
        uid (int): The unique identifier of the user.

    Returns:
        bool: True if both the credit card and user verification is successful; False otherwise.

    Example:
        verification_result = verify_user_credit_card("1234567890123456", True, 123)
    """
    if not card_number or not verified_status or not uid:
        return False
    else:
        return update_verified_field(card_number, verified_status) \
           and update_user_verified_status(uid, True)
