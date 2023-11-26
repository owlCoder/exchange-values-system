from app_factory import create_app
from config.socket import socketio

# Create the app using the factory function
app = create_app()

# This is required for Gunicorn to run the app
if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=5000)
