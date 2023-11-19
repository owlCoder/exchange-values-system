from sqlalchemy import Column, Integer, String, Boolean
from db_config import Base, engine

class User(Base):
    """
    User class represents user information.

    Attributes:
        uid (int): Unique user identifier.
        first_name (str): First name of the user.
        surname (str): Surname of the user.
        address (str): Address of the user.
        city (str): City of the user.
        country (str): Country of the user.
        phone_number (str): Phone number of the user.
        email (str): Email address of the user.
        password (str): Password of the user.
        admin (bool): Indicates if the user is an admin (True/False).
        verified (bool): Indicates if the user is verified (True/False).

    Example:
        new_user = User(
            first_name="John",
            surname="Doe",
            address="123 Main St",
            city="Example City",
            country="Example Country",
            phone_number="123-456-7890",
            email="john@example.com",
            password="secure_password",
            admin=False,
            verified=True
        )
        db.session.add(new_user)
        db.session.commit()
    """

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
        """
        Serializes user data into a dictionary.

        Returns:
            dict: Serialized user data.
        """
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
