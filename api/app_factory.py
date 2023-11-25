from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from services.transcation_proccessing import start_background

from config.socket import socketio
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
    
    # Initialize CORS
    CORS(app, origins=[ALLOWED_CLIENT_ORIGIN], methods=["POST", "GET", "PUT"])
    
    # Initialize database engine
    db.init_app(app)
    
    # Initialize SocketIO for real-time updates
    socketio.init_app(app, cors_allowed_origins=ALLOWED_CLIENT_ORIGIN)
    
    # Swagger configuration
    app.config['SWAGGER'] = {
        'title': 'Transaction Systems API',
        'version': '1.32.1',
        'uiversion': 3,
        'swagger_ui': True,
        'specs_route': '/api/',
        'swagger_ui_css': '/static/swagger-ui.css'
    }
    Swagger(app)
    
    # Register blueprints
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(token_blueprint)
    app.register_blueprint(credit_card_blueprint)
    app.register_blueprint(current_account_blueprint)
    app.register_blueprint(currencies_blueprint)
    app.register_blueprint(transaction_blueprint)
    
    # Start Transaction System service in background
    # start_background()

    from controllers.transaction import process_on_hold_transactions
    @app.route('/pokreni')
    def kreni():
        process_on_hold_transactions()
        return "OK", 200

    return app
