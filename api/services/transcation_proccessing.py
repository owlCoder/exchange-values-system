import threading
import time
from config.socket import socketio

# Function that runs in a background thread
def background_task():
    while True:
        # Do some background task here
        socketio.emit('updated_data', "helo its me", namespace="/api/realtime")
        print("Running background task...")
        time.sleep(10)  # Run transactions job on every 1 minute

# Route to start the background task
def start_background():
    # Check if the background thread is already running
    global bg_thread
    if 'bg_thread' not in globals() or not bg_thread.is_alive():
        # Create and start the background thread
        bg_thread = threading.Thread(target=background_task)
        bg_thread.start()
        return True
    else:
        return False