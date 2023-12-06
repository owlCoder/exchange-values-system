import schedule
import time
from controllers.transaction import process_on_hold_transactions
from multiprocessing import Process
from config.app import app
from config.socket import socket_io

# Function to process transactions
def background_task():
    with app.app_context():
        log_message = 'Transactions System service is processing transactions'
        print(f'127.0.0.1 - - [{time.strftime("%d/%b/%Y %H:%M:%S")}] "{log_message}"')
        emit = process_on_hold_transactions()
        print(emit)
        for tr in emit:
            socket_io.emit("live", tr)
            time.sleep(5)
    
# Schedule the background task
def schedule_background():
    schedule.every(59).seconds.do(background_task)  # Run every 1 minute

    while True:
        schedule.run_pending()
        time.sleep(1)  # Add a small delay between iterations to avoid high CPU usage

# Start the scheduling in a separate process
def start_schedule_background():
    global schedule_process
    if 'schedule_process' not in globals() or not schedule_process.is_alive():
        schedule_process = Process(target=schedule_background, args=())
        schedule_process.start()
        return True
    else:
        return False
