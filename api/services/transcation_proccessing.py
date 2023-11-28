import socket
import threading
import schedule
import time
from controllers.transaction import process_on_hold_transactions
from config.socket import socketio, realtime_data

# Function to process transactions
def background_task(app):
    with app.app_context():
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('1.1.1.1', 80))  # Connect to a well-known IP address
        remote_addr = s.getsockname()[0]  # Get the local IP address
        s.close()
        log_message = 'Transactions System service is processing transactions'
        print(f'{remote_addr} - - [{time.strftime("%d/%b/%Y %H:%M:%S")}] "{log_message}"')
        process_on_hold_transactions()
        print("============================ DATA ===============================")
        print(realtime_data)
        print("=================================================================")

        while len(realtime_data) > 0:
            data = realtime_data.pop(0)
            message = "Transaction " + str(data["amount"]) + " " + str(data["currency"]) + \
                        " to " + str(data["receiver_email"]) + " has been " + str(data["approved"]).lower()
            print(message)
            socketio.emit("updated_data", data, namespace='/api/')
            time.sleep(0.5)
    
        socketio.emit("updated_data", "No transactions in queue", namespace='/api/')

# Schedule the background task
def schedule_background(app):
    schedule.every(10).seconds.do(background_task, app)  # Run every 1 minute

    while True:
        #background_task(app)
        schedule.run_pending()
        time.sleep(20)

# Start the scheduling in a separate thread
def start_schedule_background(app):
    global schedule_thread
    if 'schedule_thread' not in globals() or not schedule_thread.is_alive():
        schedule_thread = threading.Thread(target=schedule_background, args=(app,))
        schedule_thread.start()
        return True
    else:
        return False
