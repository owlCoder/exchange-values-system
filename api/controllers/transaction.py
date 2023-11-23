from decimal import Decimal
from models.transaction import Transactions
from config.database import db

# Function to create a new transaction record using db.session
def create_transaction(sender_uid, sender_account_id, amount, receiver_uid, receiver_account_id, receiver_email, receiver_name, receiver_surname, approved):
    """
    Creates a new transaction record in the database.

    Args:
        sender_uid (int): The user ID of the sender.
        sender_account_id (int): The account ID of the sender.
        amount (Decimal): The amount involved in the transaction.
        receiver_uid (int): The user ID of the receiver.
        receiver_account_id (int): The account ID of the receiver.
        receiver_email (str): Email of the receiver.
        receiver_name (str): Name of the receiver.
        receiver_surname (str): Surname of the receiver.
        approved (str): Status of the transaction - 'ON HOLD', 'APPROVED', or 'DENIED'.

    Returns:
        bool: True if the transaction is successfully created, False otherwise.

    Example:
        create_transaction(
            sender_uid=1,
            sender_account_id=123,
            amount=Decimal('100.00'),
            receiver_uid=2,
            receiver_account_id=456,
            receiver_email="receiver@example.com",
            receiver_name="Receiver",
            receiver_surname="Surname",
            approved="ON HOLD"
        )
    """
    try:
        new_transaction = Transactions(
            sender_uid=sender_uid,
            sender_account_id=sender_account_id,
            amount=amount,
            receiver_uid=receiver_uid,
            receiver_account_id=receiver_account_id,
            receiver_email=receiver_email,
            receiver_name=receiver_name,
            receiver_surname=receiver_surname,
            approved=approved
        )

        db.session.add(new_transaction)
        db.session.commit()
        return True 
    except Exception as e:
        db.session.rollback()
        return False