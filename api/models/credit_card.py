from sqlalchemy import Boolean, Column, String, Integer, ForeignKey
from config.database import Base, engine

class CreditCard(Base):
    __tablename__ = 'credit_cards'

    card_number = Column(String(19), primary_key=True, nullable=False)
    cardholder_name = Column(String(40), nullable=False)
    expiry_date = Column(String(5), nullable=False)
    cvv = Column(String(3), nullable=False)
    verified = Column(Boolean, nullable=False)
    uid = Column(Integer, ForeignKey('users.uid'), nullable=False)

    # Python object to JSON
    def serialize(self):
        return {
            'card_number': self.card_number,
            'cardholder_name': self.cardholder_name,
            'expiry_date': self.expiry_date,
            'cvv': self.cvv,
            'verified': self.verified,
            'uid': self.uid,
        }
    
    # JSON to Python object
    @classmethod
    def deserialize(card, data):
        return card(
            card_number=data.get('card_number'),
            cardholder_name=data.get('cardholder_name'),
            expiry_date=data.get('expiry_date'),
            cvv=data.get('cvv'),
            uid=data.get('uid'),
            verified=False  # Default to False as per your code
        )

Base.metadata.create_all(engine)