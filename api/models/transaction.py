from sqlalchemy import Column, Integer, DECIMAL, String, ForeignKey, CheckConstraint
from config.database import Base, engine

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

# Create the table in the database
Base.metadata.create_all(engine)
