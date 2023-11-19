from db_config import db
from models.credit_card import CreditCard

# Method to create a new credit card
def create_credit_card(data):
    """
    Create a credit card record submitted by a user via form.

    Args:
        data (dict): A dictionary containing card information: 'card_number', 'cardholder_name', 'expiry_date', 'cvv', 'uid'.

    Returns:
        bool: True if the credit card is successfully created, False otherwise.

    Example:
        data = {
            'card_number': '1234567890123456',
            'cardholder_name': 'John Doe',
            'expiry_date': '12/25',
            'cvv': '123',
            'uid': 1
        }
        result = create_credit_card(data)
        print(result)  # True or False
    """
    card_number = data.get('card_number')
    cardholder_name = data.get('cardholder_name')
    expiry_date = data.get('expiry_date')
    cvv = data.get('cvv')
    uid = data.get('uid')

    new_credit_card = CreditCard(
        card_number=card_number,
        cardholder_name=cardholder_name,
        expiry_date=expiry_date,
        cvv=cvv,
        uid=uid,
        verified=False
    )

    try:
        db.session.add(new_credit_card)
        db.session.commit()
        return True
    except Exception as e:
        print(str(e))
        db.session.rollback()
        return False

# Method to check is credit card exist
def check_credit_card_by_uid(uid):
    """
    Check if a user has a credit card by user ID.

    Args:
        uid (int): The user ID to check.

    Returns:
        bool: True if the user has a credit card, False otherwise.

    Example:
        has_card = check_credit_card_by_uid(1)
        print(has_card)  # True or False
    """
    try:
        card = db.session.query(CreditCard).filter(CreditCard.uid == uid).first()
        return card is not None  # Return True if user has credit card, False otherwise
    except Exception as e:
        return False

# Method to get all credit cards owned by user
def get_all_credit_cards_by_uid(uid):
    """
    Retrieve all credit cards associated with a user ID.

    Args:
        uid (int): The user ID.

    Returns:
        list: A list containing serialized credit card data for the given user ID. Returns None if an error occurs.

    Example:
        credit_cards = get_all_credit_cards_by_uid(1)
        print(credit_cards)  # List of credit card data or None
    """
    try:
        credit_cards = db.session.query(CreditCard).filter(CreditCard.uid == uid).all()
        return [card.serialize() for card in credit_cards]
    except Exception as e:
        return None

# Method to verify user's credit card
def update_verified_field(card_number, verified_status):
    """
    Update the 'verified' field of a credit card by card number.

    Args:
        card_number (str): The card number of the credit card.
        verified_status (bool): The status to set for the 'verified' field.

    Returns:
        bool: True if the 'verified' field is successfully updated, False otherwise.

    Example:
        result = update_verified_field('1234567890123456', True)
        print(result)  # True or False
    """
    try:
        credit_card = db.session.query(CreditCard).filter(CreditCard.card_number == card_number).first()
        if credit_card:
            credit_card.verified = verified_status
            db.session.commit()
            return True
        else:
            return False
    except Exception as e:
        return False