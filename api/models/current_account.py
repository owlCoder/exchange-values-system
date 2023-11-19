from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL
from db_config import Base, engine

class CurrentAccount(Base):
    """
    CurrentAccount class represents a user's current account.

    Attributes:
        account_id (int): The unique identifier for the account.
        account_number (str): The account number of the current account.
        balance (float): The current balance in the account.
        currency (str): The currency type of the account.
        card_number (str): Foreign key referencing the associated credit card number.
        uid (int): Foreign key referencing the user ID associated with the account.

    Methods:
        serialize(): Converts CurrentAccount object to a dictionary.

    Example:
        new_account = CurrentAccount(
            account_number="1234567890",
            balance=1000.00,
            currency="USD",
            card_number="1234567890123456",
            uid=1
        )
        db.session.add(new_account)
        db.session.commit()
    """

    __tablename__ = 'current_account'

    account_id = Column(Integer, primary_key=True)
    account_number = Column(String(20), unique=True)
    balance = Column(DECIMAL(15, 2), default=0.00)
    currency = Column(String(5))
    card_number = Column(String(19), ForeignKey('credit_cards.card_number'), nullable=False)
    uid = Column(Integer, ForeignKey('users.uid'), nullable=False)

    def serialize(self):
        """
        Serialize CurrentAccount object to a dictionary.

        Returns:
            dict: Serialized data of the CurrentAccount object.

        Example:
            account = CurrentAccount.query.filter_by(account_number="1234567890").first()
            if account:
                account_data = account.serialize()
                print(account_data)  # {'account_id': 1, 'account_number': '1234567890', ...}
        """
        return {
            'account_id': self.account_id,
            'account_number': self.account_number,
            'balance': float(self.balance),
            'currency': self.currency,
            'card_number': self.card_number,
            'uid': self.uid
        }
    
Base.metadata.create_all(engine)