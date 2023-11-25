import threading
import schedule
import time
from controllers.transaction import process_on_hold_transactions

# Function to process transactions
def background_task(app):
    with app.app_context():
        print("Processing transactions...")
        process_on_hold_transactions()

# Schedule the background task
def schedule_background(app):
    schedule.every(1).minutes.do(background_task, app)  # Run every 1 minute

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
