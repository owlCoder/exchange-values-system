from flask import Flask
from flask_cors import CORS
from routes.auth import auth_blueprint
from routes.credit_card import credit_card_blueprint
from routes.current_account import current_account_blueprint
from routes.user import user_blueprint
from routes.token import token_blueprint
from routes.currencies import currencies_blueprint
from db_config import db

# Initialize app
app = Flask(__name__)
app.config.from_pyfile('config.py')

# Allows secure origins to access API
CORS(app, origins=["http://localhost:3000"], methods=["POST", "GET", "PUT"])

# Initialize database engine
db.init_app(app)

# Import and register blueprints
app.register_blueprint(auth_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(token_blueprint)
app.register_blueprint(credit_card_blueprint)
app.register_blueprint(current_account_blueprint)
app.register_blueprint(currencies_blueprint)

# Run app
if __name__ == '__main__':
    app.run(debug=True)
    