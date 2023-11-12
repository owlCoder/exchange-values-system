from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from db_config import Base, engine

class User(Base):
    __tablename__ = 'users'

    uid = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(255), nullable=False)
    surname = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    country = Column(String(255), nullable=False)
    phone_number = Column(String(20), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    admin = Column(Boolean, nullable=False)
    verified = Column(Boolean, nullable=False)

Base.metadata.create_all(engine)