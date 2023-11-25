import threading
import time
from controllers.transaction import process_on_hold_transactions

# Function that runs in a background thread
def background_task(app):
    with app.app_context():
        while True:
            print("Processing transactions...")
            process_on_hold_transactions()
            time.sleep(10)

# Route to start the background task
def start_background(app):
    global bg_thread
    if 'bg_thread' not in globals() or not bg_thread.is_alive():
        # Create and start the background thread
        bg_thread = threading.Thread(target=background_task, args=(app,))
        bg_thread.start()
        return True
    else:
        return False
