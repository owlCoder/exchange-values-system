from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL
from configuration.DatabaseInitializator import Base, engine

class CurrentAccount(Base):
    __tablename__ = 'current_account'

    account_id = Column(Integer, primary_key=True, autoincrement=True)
    account_number = Column(String(20))
    balance = Column(DECIMAL(15, 2), default=0.00)
    currency = Column(String(5))
    card_number = Column(String(19), ForeignKey('credit_cards.card_number'), nullable=False)
    uid = Column(Integer, ForeignKey('users.uid'), nullable=False)

    # Python object to JSON
    def serialize(self):
        return {
            'account_id': self.account_id,
            'account_number': self.account_number,
            'balance': float(self.balance),
            'currency': self.currency,
            'card_number': self.card_number,
            'uid': self.uid
        }
    
    # JSON to Python object
    @classmethod
    def deserialize(account, data):
        return account(
            account_number=data.get('account_number'),
            balance=data.get('balance'),
            currency=data.get('currency'),
            card_number=data.get('card_number'),
            uid=data.get('uid')
        )
    
Base.metadata.create_all(engine)