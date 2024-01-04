from app_factory import create_app
from configuration.SocketConfiguration import socket_io

if __name__ == '__main__':
    app = create_app()
    socket_io.run(app, debug=True, port=5000)