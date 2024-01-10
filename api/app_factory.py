from flask import Flask
from flask_cors import CORS

from services.TranscationProccessingService import start_schedule_background

from configuration.DatabaseInitializator import db
from configuration.SqlAlchemyCORSConfiguration import ALLOWED_CLIENT_ORIGIN
from configuration.SocketConfiguration import socket_io

from routes.AuthRoute import auth_blueprint
from routes.CreditCardRoute import credit_card_blueprint
from routes.CurrentAccountRoute import current_account_blueprint
from routes.UserRoute import user_blueprint
from routes.TokenRoute import token_blueprint
from routes.CurrenciesRoute import currencies_blueprint
from routes.TransactionRoute import transaction_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('configuration/SqlAlchemyCORSConfiguration.py')
    app.config['SECRET_KEY'] = 'transaction_systems_wm_1594'

    # Initialize CORS
    CORS(app, origins=[ALLOWED_CLIENT_ORIGIN], methods=["POST", "GET", "PUT"])
    
    # Initialize database engine
    db.init_app(app)

    socket_io.init_app(app, cors_allowed_origins=ALLOWED_CLIENT_ORIGIN)
    
    # Register blueprints
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(token_blueprint)
    app.register_blueprint(credit_card_blueprint)
    app.register_blueprint(current_account_blueprint)
    app.register_blueprint(currencies_blueprint)
    app.register_blueprint(transaction_blueprint)

    # Start Transaction System service in background
    start_schedule_background(app)

    # Show info message about database connection
    if app.config['SQLALCHEMY_DATABASE_URI'] == app.config['SQLALCHEMY_DATABASE_URI_DEVELOPEMENT']: 
        print("\033[35m * Running queries on developement database\033[0m")
    else: 
        print("\033[36m * Running queries on production database\033[0m")

    return app