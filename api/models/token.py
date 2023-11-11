from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Token(Base):
    __tablename__ = 'tokens'

    token = Column(String(255), primary_key=True, nullable=False)
    email = Column(String(255), nullable=False)
    uid = Column(Integer, nullable=False)

    # Define foreign keys
    user_email = Column(String(255), ForeignKey('users.email'))
    user_uid = Column(Integer, ForeignKey('users.uid'))
