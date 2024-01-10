# Docker database configuration
DB_USERNAME = 'root'
DB_PASSWORD = '123'
DB_HOST = '127.0.0.1'
DB_PORT = '3306'
DB_NAME = 'proddb'

# Aiven database configuration
AIVEN_DB_USERNAME = 'avnadmin'
AIVEN_DB_PASSWORD = 'AVNS_7v9isI8sV1NftpLJf-Y'
AIVEN_DB_HOST = 'proddb-drs-wapi.a.aivencloud.com'
AIVEN_DB_PORT = '28701'
AIVEN_DB_NAME = 'defaultdb'

# Application isn't in test mode, use production database
SQLALCHEMY_DATABASE_URI_PRODUCTION = f'mysql+mysqlconnector://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4'

# Developement database
SQLALCHEMY_DATABASE_URI_DEVELOPEMENT = f'mysql+mysqlconnector://{AIVEN_DB_USERNAME}:{AIVEN_DB_PASSWORD}@{AIVEN_DB_HOST}:{AIVEN_DB_PORT}/{AIVEN_DB_NAME}?charset=utf8mb4'

# SQLAlchemy database URI - Change optionally
SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI_DEVELOPEMENT

# SQLAlchemy settings
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False

# Other application settings
DEBUG = True  # Set to False for production

# Allow requests from only whitelisted origins
ALLOWED_CLIENT_ORIGIN = "http://localhost:3000"
