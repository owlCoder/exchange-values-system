import json
import traceback
from flask import current_app, jsonify
from models.transaction import Transactions
from config.database import db
from controllers.current_account import *
from controllers.user import get_user_by_id
from services.email_message import transaction_message
from services.email_service import get_email_sender_instance
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
        transactions = db.session.query(Transactions).filter(Transactions.approved=='ON HOLD').all()

        if transactions:
            for transaction in transactions:
                sender_account = get_current_account_by_id(transaction.sender_account_id)
                receiver_account = get_account_by_number(transaction.receiver_account_number)

                # Check if current accounts exist and does sender has enough balance to send
                if sender_account is None or float(sender_account.balance) < float(transaction.amount):
                    transaction.approved = "DENIED"
                else:
                    # Check if receiver has current account with currency from sender's account
                    account_id_in_receiver_currency = get_account_by_number_and_currency(str(transaction.receiver_account_number).strip(), sender_account.currency)
                    new_balance_receiver = 0.0
                    currency = sender_account.currency

                    try:
                        if account_id_in_receiver_currency is None:
                            new_account = CurrentAccount(
                            account_number=receiver_account.account_number,
                            balance=transaction.amount,
                            currency=sender_account.currency,
                            card_number=receiver_account.card_number,
                            uid=receiver_account.uid
                            )
                            db.session.add(new_account)

                            # New receiver account currency so initial balance is transaction amount
                            new_balance_receiver = float(transaction.amount)
                        else:
                            account = db.session.query(CurrentAccount).get(account_id_in_receiver_currency)
                            account.balance = account.balance + Decimal(str(transaction.amount))

                            # Receiver account balance is transaction amount plus old account balance
                            new_balance_receiver = float(account.balance)
                        
                        # Update sender's account balance
                        account = db.session.query(CurrentAccount).get(transaction.sender_account_id)
                        account.balance = account.balance - Decimal(str(transaction.amount))

                        # Update transaction status
                        transaction.approved = "APPROVED"
                        
                        # Send email to sender and receiver about transactions approval
                        sender_message = transaction_message(transaction.amount, sender_account.currency, sender_account.account_number, "Out", sender_account.balance)
                        receiver_message = transaction_message(transaction.amount, sender_account.currency, transaction.receiver_account_number, 'In', new_balance_receiver)
                        sender = get_user_by_id(sender_account.uid)
                        receiver = get_user_by_id(receiver_account.uid)

                        # Get the shared EmailSender instance
                        email_sender = get_email_sender_instance()

                        # Put emails into queue
                        email_sender.prepare(sender["email"], sender_message, "Transaction has been processed")
                        email_sender.prepare(receiver["email"], receiver_message, "Transaction has been processed")

                        # Add currency to dictonary
                        transaction = transaction.serialize()
                        transaction["currency"] = currency
                        
                        # Convert the dictionary to a JSON string
                        live_update = json.dumps(transaction)

                        # Emit transaction status update
                        socketio.emit('updated_data', live_update, namespace="/api/realtime")
                    except Exception as e:
                        db.session.rollback()
                                
                # Commit changes to database
                db.session.commit()