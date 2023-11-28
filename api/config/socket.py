from flask_socketio import Namespace
from flask_socketio import SocketIO

# Define new realtime socket
socketio = SocketIO()

# Define a custom namespace
class RealTimeNamespace(Namespace):
    def on_connect(self):
        print('Client connected to realtime updates service')

    def on_disconnect(self):
        print('Client disconnected from realtime updates service')

socketio.on_namespace(RealTimeNamespace('/api/'))

# To emit all in-progress transactions
realtime_data = []