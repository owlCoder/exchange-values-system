from configuration.DatabaseInitializator import db
from models.CreditCard import CreditCard
from controllers.CurrentAccountController import create_current_account
from utilities.AccountNumberGenerator import generate_account_number

# Method to create a new credit card
def create_credit_card(data):
    try:
        new_card = CreditCard.deserialize(data)
        db.session.add(new_card)
        current_account = { 
            "account_number": generate_account_number(),
            "balance": 0,
            "currency": "RSD",
            "card_number": new_card.card_number,
            "uid": new_card.uid
        }
        create_current_account(current_account)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
        db.session.rollback()
        return False

# Method to check is credit card exist
def check_credit_card_by_uid(uid):
    try:
        card = db.session.query(CreditCard).filter(CreditCard.uid == uid).first()
        return card is not None  # Return True if user has credit card, False otherwise
    except Exception as e:
        return False

# Method to get all credit cards owned by user
def get_all_credit_cards_by_uid(uid):
    try:
        credit_cards = db.session.query(CreditCard).filter(CreditCard.uid == uid).all()
        return [card.serialize() for card in credit_cards]
    except Exception as e:
        return None

# Method to verify user's credit card
def update_verified_field(card_number, verified_status):
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