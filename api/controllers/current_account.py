from decimal import Decimal
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
        print(str(e))
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
        account_id = check_account_exists(1, "USD")
    """
    try:
        account = db.session.query(CurrentAccount).filter_by(card_number=card_number, uid=uid, currency=currency).first()
        return account.account_id if account else None
    except Exception as e:
        return None

def check_current_account_exists(account_id):
    """
    Checks if a current account exists based on the account ID.

    Args:
        account_id (int): The account ID to check.

    Returns:
        bool: Returns True if the account exists, otherwise returns False.

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
            account.balance = account.balance +  Decimal(str(amount))
            db.session.commit()
            return True
        else:
            return False
    except Exception as e:
        db.session.rollback()
        return False

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
