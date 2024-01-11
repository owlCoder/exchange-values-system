from sqlalchemy import Column, String, Integer, ForeignKey
from configuration.DatabaseInitializator import Base, engine

class Token(Base):
    __tablename__ = 'tokens'

    token = Column(String(255), primary_key=True, nullable=False)
    email = Column(String(255), ForeignKey('users.email'), nullable=False)
    uid = Column(Integer, ForeignKey('users.uid'), nullable=False)

    # Python object to JSON
    def serialize(self):
        return {
            'token': self.token,
            'email': self.email,
            'uid': self.uid
        }

    # JSON to Python object
    @classmethod
    def deserialize(token, data):
        import json
        data = json.loads(data)
        return token(
            token=data.get('token'),
            email=data.get('email'),
            uid=data.get('uid')
        )

Base.metadata.create_all(engine)
