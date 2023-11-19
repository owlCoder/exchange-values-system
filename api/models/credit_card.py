from sqlalchemy import Boolean, Column, String, Integer, ForeignKey
from db_config import Base, engine

class CreditCard(Base):
    """
    CreditCard class represents a credit card entity.

    Attributes:
        card_number (str): The card number of the credit card.
        cardholder_name (str): The name of the cardholder.
        expiry_date (str): The expiry date of the credit card.
        cvv (str): The CVV code of the credit card.
        verified (bool): The verification status of the credit card.
        uid (int): Foreign key referencing the user ID associated with the credit card.

    Methods:
        serialize(): Converts CreditCard object to a dictionary.

    Example:
        new_card = CreditCard(
            card_number="1234567890123456",
            cardholder_name="John Doe",
            expiry_date="12/23",
            cvv="123",
            verified=False,
            uid=1
        )
        db.session.add(new_card)
        db.session.commit()
    """

    __tablename__ = 'credit_cards'

    card_number = Column(String(19), primary_key=True, nullable=False)
    cardholder_name = Column(String(40), nullable=False)
    expiry_date = Column(String(5), nullable=False)
    cvv = Column(String(3), nullable=False)
    verified = Column(Boolean, nullable=False)
    uid = Column(Integer, ForeignKey('users.uid'), nullable=False)

    def serialize(self):
        """
        Serialize CreditCard object to a dictionary.

        Returns:
            dict: Serialized data of the CreditCard object.

        Example:
            card = CreditCard.query.filter_by(card_number="1234567890123456").first()
            if card:
                card_data = card.serialize()
                print(card_data)  # {'card_number': '1234567890123456', 'cardholder_name': 'John Doe', ...}
        """
        return {
            'card_number': self.card_number,
            'cardholder_name': self.cardholder_name,
            'expiry_date': self.expiry_date,
            'cvv': self.cvv,
            'verified': self.verified,
        }

Base.metadata.create_all(engine)