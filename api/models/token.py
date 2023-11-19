from sqlalchemy import Column, String, Integer, ForeignKey
from db_config import Base, engine

class Token(Base):
    """
    Token class represents a user token for authentication.

    Attributes:
        token (str): Unique token identifier.
        email (str): Foreign key referencing the associated user's email.
        uid (int): Foreign key referencing the user ID associated with the token.

    Example:
        new_token = Token(
            token="some_unique_token_string",
            email="example@example.com",
            uid=1
        )
        db.session.add(new_token)
        db.session.commit()
    """

    __tablename__ = 'tokens'

    token = Column(String(255), primary_key=True, nullable=False)
    email = Column(String(255), ForeignKey('users.email'), nullable=False)
    uid = Column(Integer, ForeignKey('users.uid'), nullable=False)

Base.metadata.create_all(engine)
