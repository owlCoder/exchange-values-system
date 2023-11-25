import smtplib
from email.mime.text import MIMEText

# Method to prepare an email
def prepare(receiver_email, message_body, subject):
    """
    Prepares an email message to be sent.

    Args:
        receiver_email (str): The email address of the recipient.
        message_body (str): The content of the email message.
        subject (str): The subject line of the email.

    Returns:
        bool: True if the email is successfully prepared and sent, False otherwise.

    Example:
        email_content = "This is a test email content."
        subject_line = "Test Email"
        receiver = "example@example.com"
        success = prepare(receiver, email_content, subject_line)
    """
    message = MIMEText(message_body)
    message['Subject'] = subject
    message['From'] = f'{"Transaction Systems Support"} <{"danijelj2001.xda@gmail.com"}>'

    # Send email
    success = send(receiver_email, message)

    if success:
        print("Email prepared and sent successfully")
        return True
    else:
        print("Email preparation or sending failed")
        return False

# Send email content to receiver email
def send(receiver_email, message):
    """
    Sends an email message to the specified receiver.

    Args:
        receiver_email (str): The email address of the recipient.
        message (email.mime.text.MIMEText): The email message to be sent.

    Returns:
        bool: True if the email is successfully sent, False otherwise.

    Example:
        receiver = "example@example.com"
        email_message = MIMEText("This is a test email content.")
        email_message['Subject'] = "Test Email"
        success = send(receiver, email_message)
    """
    try:
        server = smtplib.SMTP('smtp-mail.outlook.com', 587)
        server.starttls()
        server.login('danijelj2001.xda@gmail.com', 'D@lib0rka123')
        server.sendmail('danijelj2001.xda@gmail.com', receiver_email, message.as_string())
        server.quit()
        return True
    except Exception as e:
        return False