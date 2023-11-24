import asyncio
import threading
import time
import schedule

# Function to update the table (replace this with your table update logic)
def update_table():
    print("Table updated at:", time.strftime("%H:%M:%S"))

# Function to run the scheduler for the background task
def background_task():
    while True:
        schedule.run_pending()
        time.sleep(1)

# Schedule the table update task to run every 1 minute
schedule.every(1).minutes.do(update_table)

# Start the background task with schedule
thread = threading.Thread(target=background_task)
thread.start()