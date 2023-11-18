from sqlalchemy import Column, Integer, String, Boolean
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

    def serialize(self):
        return {
            'uid': self.uid,
                'first_name': self.first_name,
                'surname': self.surname,
                'address': self.address,
                'city': self.city,
                'country': self.country,
                'phone_number': self.phone_number,
                'email': self.email,
                'password': self.password,
                'admin': self.admin,
                'verified': self.verified,
        }

Base.metadata.create_all(engine)