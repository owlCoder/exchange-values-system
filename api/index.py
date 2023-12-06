from config.app import app
from config.socket import socket_io
from services.transcation_proccessing import start_schedule_background

# Start Transaction System service in background
start_schedule_background()

if __name__ == '__main__':
    # Run application
    socket_io.run(app, debug=True, port=5000)