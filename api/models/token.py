from sqlalchemy import Column, String, Integer, ForeignKey
from config.database import Base, engine

class Token(Base):
    __tablename__ = 'tokens'

    token = Column(String(255), primary_key=True, nullable=False)
    email = Column(String(255), ForeignKey('users.email'), nullable=False)
    uid = Column(Integer, ForeignKey('users.uid'), nullable=False)

Base.metadata.create_all(engine)
