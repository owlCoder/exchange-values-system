# Database configuration
DB_USERNAME = 'avnadmin'
DB_PASSWORD = 'AVNS_7v9isI8sV1NftpLJf-Y'
DB_HOST = 'proddb-drs-wapi.a.aivencloud.com'
DB_PORT = '28701'
DB_NAME = 'defaultdb'

# SQLAlchemy database URI
SQLALCHEMY_DATABASE_URI = f'mysql+mysqlconnector://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4'

# SQLAlchemy settings
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False

# Other application settings
DEBUG = True  # Set to False for production

# Allow requests from only whitelisted origins
ALLOWED_CLIENT_ORIGIN = "*"
