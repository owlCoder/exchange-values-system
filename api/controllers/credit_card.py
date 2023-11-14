from db_config import db
from models.credit_card import CreditCard

def create_credit_card(data):
    card_number = data.get('card_number')
    cardholder_name = data.get('cardholder_name')
    expiry_date = data.get('expiryDate')
    cvv = data.get('cvv')
    uid = data.get('uid')

    if not card_number or not cardholder_name or not expiry_date or not cvv or not uid:
        return False

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
