from db_config import db
from models.credit_card import CreditCard

def create_credit_card(data):
    card_number = data.get('cardNumber')
    cardholder_name = data.get('cardName')
    expiry_date = data.get('expiryDate')
    cvv = data.get('cvv')
    uid = data.get('uid')

    new_credit_card = CreditCard(
        card_number=card_number,
        cardholder_name=cardholder_name,
        expiry_date=expiry_date,
        cvv=cvv,
        uid=uid
    )

    try:
        db.session.add(new_credit_card)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False


def check_credit_card_by_uid(uid):
    try:
        card = db.session.query(CreditCard).filter(CreditCard.uid == uid).first()
        return card is not None  # Return True if user has credit card, False otherwise
    except Exception as e:
        return False