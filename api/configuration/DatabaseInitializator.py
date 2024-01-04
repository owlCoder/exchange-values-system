from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from configuration.SqlAlchemyCORSConfiguration import SQLALCHEMY_DATABASE_URI

engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=False)
Base = declarative_base()
db = SQLAlchemy()

CURRENCY_API_URL = 'https://currency-exchange-api-six.vercel.app/'