from app_factory import create_app
from config.socket import socketio

if __name__ == '__main__':
    app = create_app()
    socketio.run(app, debug=True)