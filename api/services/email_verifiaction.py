import smtplib
from email.mime.text import MIMEText

def send_email(receiver_email, email, password):
    smtp_server = 'smtp-mail.outlook.com'
    port = 587
    sender_email = 'danijelj2001.xda@gmail.com'
    sender_name = 'Transaction Systems Support'

    message_body = f"""\
    Hello,

    Welcome to new era of transcations!

    Here are your login details:
    Email: {email}
    Password: {password}

    Best regards,
    Transactions System Support Team
    """

    message = MIMEText(message_body)
    message['Subject'] = 'Account Registration'
    message['From'] = f'{sender_name} <{sender_email}>'

    try:
        server = smtplib.SMTP(smtp_server, port)
        server.starttls()
        server.login(sender_email, 'D@lib0rka123')
        server.sendmail(sender_email, receiver_email, message.as_string())
        server.quit()
        return True
    except Exception as e:
        return False