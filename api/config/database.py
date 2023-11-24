from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from config.config import SQLALCHEMY_DATABASE_URI
from flask_socketio import SocketIO

engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=False)
Base = declarative_base()
db = SQLAlchemy()
socketio = SocketIO()

CURRENCY_API_URL = 'https://currency-exchange-api-six.vercel.app/'