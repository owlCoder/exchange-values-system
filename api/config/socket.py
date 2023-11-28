from flask_socketio import SocketIO

socket_io = SocketIO()

@socket_io.on("connect")
def connection():
    print("Connected!")

@socket_io.on("disconnect")
def connection():
    print("Disconnected!")