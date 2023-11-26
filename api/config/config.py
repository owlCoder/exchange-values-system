# Database configuration
DB_USERNAME = 'root'
DB_PASSWORD = '123'
DB_HOST = '172.17.0.2' # Change to localmachine ip adress to access database
DB_PORT = '3306'
DB_NAME = 'proddb'

# SQLAlchemy database URI
SQLALCHEMY_DATABASE_URI = f'mysql+mysqlconnector://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4'

# SQLAlchemy settings
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False

# Other application settings
DEBUG = True  # Set to False for production

# Allow requests from only whitelisted origins
ALLOWED_CLIENT_ORIGIN = ["http://localhost:3000", "ws://localhost:3000"]
