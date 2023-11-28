from flask import Flask
from flask_cors import CORS

from services.transcation_proccessing import start_schedule_background

from config.database import db
from config.config import ALLOWED_CLIENT_ORIGIN

from routes.auth import auth_blueprint
from routes.credit_card import credit_card_blueprint
from routes.current_account import current_account_blueprint
from routes.user import user_blueprint
from routes.token import token_blueprint
from routes.currencies import currencies_blueprint
from routes.transaction import transaction_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config/config.py')
    app.config['SECRET_KEY'] = 'transaction_systems_wm_1594'
    
    # Initialize CORS
    CORS(app, origins=[ALLOWED_CLIENT_ORIGIN], methods=["POST", "GET", "PUT"])
    
    # Initialize database engine
    db.init_app(app)

    from config.socket import socket_io
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
    
    return app