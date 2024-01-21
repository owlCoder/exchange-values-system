import smtplib
import queue
import threading
from email.mime.text import MIMEText
import time

class EmailSender:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super().__new__(cls)
                cls._instance.email_queue = queue.Queue()
                cls._instance.start_email_thread()
        return cls._instance

    def start_email_thread(self):
        self.email_thread = threading.Thread(target=self.send_emails)
        self.email_thread.daemon = True
        self.email_thread.start()

    # Method to prepare an email and add it to the queue
    def prepare(self, receiver_email, message_body, subject):
        message = MIMEText(message_body)
        message['Subject'] = subject
        message['From'] = f'{"Transaction Systems Support"} <{"example@mail.com"}>'
        
        # Add email message to the queue
        self.email_queue.put((receiver_email, message))

        # return response
        return True

    # Send emails in the background thread
    def send_emails(self):
        while True:
            try:
                receiver_email, message = self.email_queue.get(timeout=5)  # Timeout set to prevent blocking indefinitely
                
                server = smtplib.SMTP('smtp-mail.outlook.com', 587)
                server.starttls()
                server.login('example@mail.com', 'password')
                server.sendmail('example@mail.com', receiver_email, message.as_string())
                server.quit()
                
                print(f"Email sent to {receiver_email}")
                
            except queue.Empty:
                pass  # No emails in the queue
            except Exception as e:
                print(f"Failed to send email: {str(e)}")
            
            time.sleep(30)  # Wait for 30 seconds for email to be sent

# Function to get the shared EmailSender instance
def get_email_sender_instance():
    return EmailSender()
