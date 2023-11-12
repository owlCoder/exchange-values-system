from flask import Flask
from flask_cors import CORS
from routes.user import user_blueprint
from db_config import db

# Initialize app
app = Flask(__name__)
app.config.from_pyfile('config.py')

# Allows all origins to access your API.
CORS(app)

# Initialize database engine
db.init_app(app)

# Import and register your blueprints/routes here
app.register_blueprint(user_blueprint)

# Run app
if __name__ == '__main__':
    app.run(debug=True)
    