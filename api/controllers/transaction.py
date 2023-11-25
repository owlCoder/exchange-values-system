from flask import jsonify
from models.transaction import Transactions
from config.database import db
from controllers.current_account import *
from controllers.user import get_user_by_id
from services.email_message import transaction_message
from services.email_service import prepare
from config.socket import socketio

# Function to create a new transaction record using db.session
def create_transaction(sender_uid, sender_account_id, amount, receiver_account_number, receiver_email, receiver_name, receiver_surname, approved):
    """
    Creates a new transaction record in the database.

    Args:
        sender_uid (int): The user ID of the sender.
        sender_account_id (int): The account ID of the sender.
        amount (Decimal): The amount involved in the transaction.
        receiver_account_number (str): The account number of the receiver.
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
            receiver_account_number=170-48909648905,
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
            receiver_account_number=receiver_account_number,
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

# Method to process transactions waiting for proccessing
def process_on_hold_transactions():
    # Get all on hold transactions
    try:
        transactions = db.session.query(Transactions).filter_by(approved="ON HOLD").all()
        if transactions:
            for transaction in transactions:
                if process_transaction(transaction.sender_account_id, transaction.receiver_account_number, transaction.amount):
                    transaction.approved = "APPROVED"
                else:
                    transaction.approved = "DENIED"

                print(transaction.approved)
                live_update = jsonify({'data': transaction})

                # Emit transaction status update
                socketio.emit('updated_data', live_update, namespace="/api/realtime")
                
                #db.session.commit()
    except Exception as e:
        return

# Method to process individual transaction
def process_transaction(sender_account_id, receiver_account_number, amount):
    sender_account = get_current_account_by_id(sender_account_id)
    receiver_account = get_account_by_number(receiver_account_number)
    
    # Check if current accounts exist and does sender has enough balance to send
    if sender_account is None or receiver_account is None or sender_account.balance < amount:
        return False
    
    # Check if receiver has current account with currency from sender's account
    account_id_in_receiver_currency = get_account_by_number_and_currency(receiver_account.account_number, sender_account.currency)

    # Create new currency for receiver account
    if account_id_in_receiver_currency is None:
        success = create_current_account(receiver_account.account_number, amount, receiver_account.currency, receiver_account.card_number, receiver_account.uid)
    else:
        # Update receiver's existing account balance
        success = update_account_balance(account_id_in_receiver_currency, amount)
    
    # Receiver has new transaction approved
    if success:
        update_account_balance(sender_account_id, -amount)

        # Send email to sender and receiver about transactions approval
        sender_message = transaction_message(amount, sender_account.currency, sender_account.account_number, "Out", sender_account.balance)
        receiver_message = transaction_message(amount, sender_account.currency, receiver_account_number, 'In', get_current_account_by_id(account_id_in_receiver_currency).balance)

        # Send transactions confirmation emails
        sender = get_user_by_id(sender_account.uid)
        receiver = get_user_by_id(receiver_account.uid)

        print("\n\n--------------------------- STAMPA -----------------------------")
        print(sender_message)
        print("--------------------------------------------------------------------")
        
        if sender and receiver and \
           prepare(sender.email, sender_message, "Transcation has been processed") and \
           prepare(receiver.email, receiver_message, "Transcation has been processed"):
            return True
        else:
            return False
    else:
        return False