from configuration.SocketConfiguration import socket_io
from models.Transaction import Transactions
from configuration.DatabaseInitializator import db
from controllers.CurrentAccountController import *
from controllers.UserController import get_user_by_id
from utilities.EmailMessageParser import transaction_message
from services.EmailSenderService import get_email_sender_instance
import time


# Function to create a new transaction record using db.session
def create_transaction(data):
    try:
        db.session.add(Transactions.deserialize(data))
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False


# Method to process transactions waiting for proccessing
def process_on_hold_transactions():
    # Get all on hold transactions
    transactions = (db.session.query(Transactions).filter(Transactions.approved == "ON HOLD").all())

    if transactions:
        for transaction in transactions:
            sender_account = get_current_account_by_id(transaction.sender_account_id)
            receiver_account = get_account_by_account_number(transaction.receiver_account_number)
            
            new_balance_receiver = 0.0
            currency = sender_account.currency
            
            # Check if current accounts exist and does sender has enough balance to send
            if sender_account is None or float(sender_account.balance) < float(transaction.amount):
                transaction.approved = "DENIED"
            else:
                # Check if receiver account exists
                if receiver_account is None:
                    transaction.approved = "DENIED"
                else:
                    # Check if receiver has current account with currency from sender's account
                    account_id_in_receiver_currency = (
                        get_account_by_number_and_currency(
                            str(transaction.receiver_account_number).strip(),
                            sender_account.currency,
                        )
                    )
                    
                    try:
                        if account_id_in_receiver_currency is None:
                            new_account = CurrentAccount(
                                account_number=receiver_account.account_number,
                                balance=transaction.amount,
                                currency=sender_account.currency,
                                card_number=receiver_account.card_number,
                                uid=receiver_account.uid,
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
                        sender_message = transaction_message(
                            transaction.amount,
                            sender_account.currency,
                            sender_account.account_number,
                            "Out",
                            sender_account.balance,
                        )
                        receiver_message = transaction_message(
                            transaction.amount,
                            sender_account.currency,
                            transaction.receiver_account_number,
                            "In",
                            new_balance_receiver,
                        )
                        sender = get_user_by_id(sender_account.uid)
                        receiver = get_user_by_id(receiver_account.uid)

                        # Get the shared EmailSender instance
                        email_sender = get_email_sender_instance()

                        # Put emails into queue
                        email_sender.prepare(sender["email"], sender_message, "Transaction has been processed")
                        email_sender.prepare(receiver["email"], receiver_message, "Transaction has been processed")
                    except Exception as e:
                        db.session.rollback()

            # Add currency to dictonary
            transaction = transaction.serialize()
            transaction["currency"] = currency

            # Convert the dictionary to a JSON string
            socket_io.emit("live", transaction)
            
            # Between 2 emits add a little pause to prevent browser spam request filter activation
            time.sleep(5.0)

            # Commit changes to database
            db.session.commit()
