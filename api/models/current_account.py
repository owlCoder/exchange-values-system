from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from db_config import Base, engine

class CurrentAccount(Base):
    __tablename__ = 'current_account'

    account_id = Column(Integer, primary_key=True)
    account_number = Column(String(20), unique=True)
    balance = Column(DECIMAL(15, 2), default=0.00)
    currency = Column(String(5))
    card_number = Column(String(19), ForeignKey('credit_cards.card_number'), nullable=False)
    uid = Column(Integer, ForeignKey('users.uid'), nullable=False)

    def serialize(self):
        return {
            'account_id': self.account_id,
            'account_number': self.account_number,
            'balance': float(self.balance),
            'currency': self.currency,
            'card_number': self.card_number,
            'uid': self.uid
        }
    
Base.metadata.create_all(engine)