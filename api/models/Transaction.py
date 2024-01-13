from sqlalchemy import Column, Integer, DECIMAL, String, ForeignKey, CheckConstraint
from configuration.DatabaseInitializator import Base, engine

class Transactions(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    sender_uid = Column(Integer, ForeignKey('users.uid'), nullable=False)
    sender_account_id = Column(Integer, ForeignKey('current_account.account_id'), nullable=False)
    amount = Column(DECIMAL, nullable=False)
    receiver_account_number = Column(String(255), nullable=False)
    receiver_email = Column(String(255), nullable=False)
    receiver_name = Column(String(255), nullable=False)
    receiver_surname = Column(String(255), nullable=False)
    approved = Column(String(16), CheckConstraint("approved IN ('ON HOLD', 'APPROVED', 'DENIED')"), nullable=False)

    # Python object to JSON
    def serialize(self):
        return {
            'id': self.id,
            'sender_uid': self.sender_uid,
            'sender_account_id': self.sender_account_id,
            'amount': float(self.amount),
            'receiver_account_number': self.receiver_account_number,
            'receiver_email': self.receiver_email,
            'receiver_name': self.receiver_name,
            'receiver_surname': self.receiver_surname,
            'approved': self.approved
        }
    
    @classmethod
    def deserialize(cls, data):
        return cls(
            id=data.get('id'),
            sender_uid=data.get('sender_uid'),
            sender_account_id=data.get('sender_account_id'),
            amount=float(data.get('amount', 0.0)),  # Default value of 0.0 if 'amount' is not present
            receiver_account_number=data.get('receiver_account_number'),
            receiver_email=data.get('receiver_email'),
            receiver_name=data.get('receiver_name'),
            receiver_surname=data.get('receiver_surname'),
            approved=data.get('approved', False)
        )

# Create the table in the database
Base.metadata.create_all(engine)
