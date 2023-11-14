from sqlalchemy import Column, String, Integer, ForeignKey
from db_config import Base, engine

class CreditCard(Base):
    __tablename__ = 'credit_cards'

    card_number = Column(String(19), primary_key=True, nullable=False)
    cardholder_name = Column(String(40), nullable=False)
    expiry_date = Column(String(5), nullable=False)
    cvv = Column(String(3), nullable=False)
    uid = Column(Integer, ForeignKey('users.uid'), nullable=False)

Base.metadata.create_all(engine)