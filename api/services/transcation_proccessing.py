import socket
import threading
import schedule
import time
from controllers.transaction import process_on_hold_transactions

# Function to process transactions
def background_task(app):
    with app.app_context():
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))  # Connect to a well-known IP address
        remote_addr = s.getsockname()[0]  # Get the local IP address
        s.close()
        log_message = 'Transactions System service is processing transactions'
        print(f'{remote_addr} - - [{time.strftime("%d/%b/%Y %H:%M:%S")}] "{log_message}"')
        process_on_hold_transactions()

# Schedule the background task
def schedule_background(app):
    schedule.every(60).seconds.do(background_task, app)  # Run every 1 minute

    while True:
        schedule.run_pending()
        time.sleep(1)

# Start the scheduling in a separate thread
def start_schedule_background(app):
    global schedule_thread
    if 'schedule_thread' not in globals() or not schedule_thread.is_alive():
        schedule_thread = threading.Thread(target=schedule_background, args=(app,))
        schedule_thread.start()
        return True
    else:
        return False
