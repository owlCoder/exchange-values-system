from flask import Flask
from flask_cors import CORS
from routes.user import user_blueprint
from routes.token import token_blueprint
from routes.auth import auth_blueprint
from db_config import db

# Initialize app
app = Flask(__name__)
app.config.from_pyfile('config.py')

# Allows secure origins to access API
CORS(app, origins=["http://localhost:3000"], methods=["POST"])

# Initialize database engine
db.init_app(app)

# Import and register your blueprints
app.register_blueprint(user_blueprint)
app.register_blueprint(token_blueprint)
app.register_blueprint(auth_blueprint)

# Run app
if __name__ == '__main__':
    app.run(debug=True)
    