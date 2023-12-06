from config.database import db
from models.credit_card import CreditCard
from controllers.current_account import create_current_account
from services.account_number_generator import generate_account_number

# Method to create a new credit card
def create_credit_card(data):
    try:
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
        
        db.session.add(new_credit_card)
        create_current_account(generate_account_number(), 0, 'RSD', card_number, uid)
        db.session.commit()
        return True
    except Exception as e:
        import traceback
        traceback.print_exc()
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