# Docker database configuration
DB_USERNAME = 'root'
DB_PASSWORD = '123'
DB_HOST = '127.0.0.1'
DB_PORT = '3306'
DB_NAME = 'proddb'

# Application isn't in test mode, use production database
SQLALCHEMY_DATABASE_URI_PRODUCTION = f'mysql+mysqlconnector://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4'

# SQLAlchemy database URI - Change optionally
SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI_PRODUCTION

# SQLAlchemy settings
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False

# Other application settings
DEBUG = True  # Set to False for production

# Allow requests from only whitelisted origins
ALLOWED_CLIENT_ORIGIN = "http://localhost:3000"
