from decimal import Decimal
from services.account_number_generator import generate_account_number
from models.current_account import CurrentAccount
from config.database import db

# Method to create a new current account
def create_current_account(account_number, balance, currency, card_number, uid):
    """
    Creates a new current account.

    Args:
        account_number (str): The account number of the current account.
        balance (float): The initial balance in the account.
        currency (str): The currency type of the account.
        card_number (str): The associated credit card number.
        uid (int): The user ID associated with the account.

    Returns:
        True or False: Returns True if the account is created successfully,
                     otherwise returns False.

    Example:
        is_created = create_current_account("1234567890", 1000.00, "USD", "1234567890123456", 1)
    """
    try:
        new_account = CurrentAccount(
            account_number=account_number,
            balance=balance,
            currency=currency,
            card_number=card_number,
            uid=uid
        )
        db.session.add(new_account)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

# Method to check if an account exists based on UID and currency
def check_account_exists(uid, card_number, currency):
    """
    Checks if an account exists based on user ID, card number and currency.

    Args:
        uid (int): The user ID associated with the account.
        card_number (str): The user card number associated with the account.
        currency (str): The currency type of the account.

    Returns:
        int or None: Returns the account ID if the account exists, otherwise returns None.

    Example:
        account_id = check_account_exists(1, "3434 3434 5667 2223", "USD")
    """
    try:
        account = db.session.query(CurrentAccount).filter_by(card_number=card_number, uid=uid, currency=currency).first()
        return account.account_id if account else None
    except Exception as e:
        return None
    
# Method to check if an account exists based on UID and currency
def get_account_number(uid, card_number):
    try:
        account = db.session.query(CurrentAccount).filter_by(card_number=card_number, uid=uid).first()
        return account
    except Exception as e:
        return None

def get_current_account_by_id(account_id):
    """
    Checks if a current account exists based on the account ID.

    Args:
        account_id (int): The account ID to check.

    Returns:
        bool: Returns an account if the account exists, otherwise returns None.

    Example:
        account_exists = check_current_account_exists(123)
    """
    try:
        # Query the database to find the account with the given account ID
        account = db.session.query(CurrentAccount).filter_by(account_id=account_id).first()
        return account
    except Exception as e:
        return None

# Method to update the balance of an account by account ID
def update_account_balance(account_id, amount):
    """
    Updates the balance of an account by account ID.

    Args:
        account_id (int): The unique identifier for the account.
        amount (float): The new amout to be added in the account.

    Returns:
        bool: True if the account balance is successfully updated, otherwise False.

    Example:
        success = update_account_balance(1, 1500.00)
    """
    try:
        account = db.session.query(CurrentAccount).get(account_id)
        if account:
            account.balance = account.balance + Decimal(str(amount))
            db.session.commit()
            return True
        else:
            return False
    except Exception as e:
        db.session.rollback()
        return False

# Method to get account by account number
def get_account_by_number(account_number):
    try:
        account = db.session.query(CurrentAccount).filter_by(account_number=account_number).first()
        return account
    except Exception as e:
        return None
    
# Method to get account id by account number and currency
def get_account_by_number_and_currency(account_number, currency):
    try:
        account = db.session.query(CurrentAccount).filter_by(account_number=account_number, currency=currency).first()
        return account.account_id if account else None
    except Exception as e:
        return None

# Method to get all current accounts connected with credit card
def get_all_current_accounts(card_number):
    """
    Retrieves all accounts associated with a specified credit card number.

    Args:
        card_number (str): The credit card number to search for.

    Returns:
        list or None: A list of CurrentAccount objects associated with the specified card_number.
                      Returns None if an error occurs during the query.

    Example:
        accounts = get_all_current_accounts('1234567890123456')
        if accounts:
            for account in accounts:
                print(f"Account ID: {account.account_id}, Balance: {account.balance}, Currency: {account.currency}")
    """
    try:
        accounts = db.session.query(CurrentAccount).filter(CurrentAccount.card_number == card_number).all()
        return accounts
    except Exception as e:
        return None

# Method to exchange current account funds
def exchange_funds(account_id, new_balance, amount_to_exchange, currency_to_convert):
    response = {}; response['error'] = ""; response['code'] = 200
    account = get_current_account_by_id(account_id)

    if account:
        # Check if balance fits to requested exchange balance
        if float(account.balance) < float(amount_to_exchange) or float(amount_to_exchange) < 0.0:
            response['error'] = "Insufficient funds on the account"; response['code'] = 400
        else:
            account_id_destination = check_account_exists(account.uid, account.card_number, currency_to_convert)
            
            # If current account already has account with convert currency then just update it
            if account_id_destination:
                try:
                    account_source = db.session.query(CurrentAccount).get(account_id) # Source account
                    account_destination = db.session.query(CurrentAccount).get(account_id_destination) # Destination account

                    if account_source and account_destination:
                        account_source.balance = account.balance - Decimal(str(amount_to_exchange))
                        account_destination.balance = account_destination.balance + Decimal(str(new_balance))
                        db.session.commit()
                        response['error'] = "Account balance has been exchanged"; response['code'] = 201
                    else:
                        response['error'] = "Account balance couldn't been exchanged"; response['code'] = 400
                except Exception as e:
                    db.session.rollback()
                    response['error'] = "Account balance couldn't been exchanged"; response['code'] = 501
            else:
                # Create a new destination account with new currency
                try:
                    account_source = db.session.query(CurrentAccount).get(account_id) # Source account
                    
                    # Create a new currency on account
                    new_account = CurrentAccount(
                        account_number=account.account_number,
                        balance=new_balance,
                        currency=currency_to_convert,
                        card_number=account.card_number,
                        uid=account.uid
                    )
                    
                    if account_source:
                        account_source.balance = account.balance - Decimal(str(amount_to_exchange))
                        db.session.add(new_account) # Add new account with new balance
                        db.session.commit()
                        response['error'] = "Account balance has been exchanged"; response['code'] = 201
                    else:
                        response['error'] = "Account balance couldn't been exchanged"; response['code'] = 400
                except Exception as e:
                    db.session.rollback()
                    response['error'] = "Account balance couldn't been exchanged"; response['code'] = 502
    else:
        response['error'] = "Account balance couldn't been exchanged"; response['code'] = 404
    
    return response