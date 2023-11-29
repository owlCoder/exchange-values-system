from app_factory import create_app
from config.socket import socket_io

if __name__ == '__main__':
    app = create_app()
    socket_io.run(app)