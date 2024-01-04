from decimal import Decimal
from api.models.CrrentAccount import CurrentAccount
from configuration.DatabaseInitializator import db

# Method to create a new current account
def create_current_account(data):
    try:
        db.session.add(CurrentAccount.deserialize(data))
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

# Method to check if an account exists based on UID and currency
def check_account_exists_by_uid_cardnumber_currency(uid, card_number, currency):
    try:
        account = db.session.query(CurrentAccount).filter(CurrentAccount.card_number==card_number, CurrentAccount.uid==uid, CurrentAccount.currency==currency).first()
        return account.account_id if account else None
    except Exception as e:
        return None
    
# Method to check if an account exists based on UID and currency
def get_account_number_by_uid_and_cardnumber(uid, card_number):
    try:
        account = db.session.query(CurrentAccount).filter(CurrentAccount.card_number==card_number, CurrentAccount.uid==uid).first()
        return account
    except Exception as e:
        return None

def get_current_account_by_id(account_id):
    try:
        # Query the database to find the account with the given account ID
        account = db.session.query(CurrentAccount).filter(CurrentAccount.account_id==account_id).first()
        return account
    except Exception as e:
        return None

# Method to update the balance of an account by account ID
def update_account_balance(account_id, amount):
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
def get_account_by_account_number(account_number):
    try:
        account = db.session.query(CurrentAccount).filter(CurrentAccount.account_number==str(account_number).strip()).first()
        return account
    except Exception as e:
        return None
    
# Method to get account id by account number and currency
def get_account_by_number_and_currency(account_number, currency):
    try:
        account = db.session.query(CurrentAccount).filter(CurrentAccount.account_number==account_number, CurrentAccount.currency==currency).first()
        return account.account_id if account else None
    except Exception as e:
        return None

# Method to get all current accounts connected with credit card
def get_all_current_accounts_by_cardnumber(card_number):
    try:
        accounts = db.session.query(CurrentAccount).filter(CurrentAccount.card_number == card_number).all()
        return [account.serialize() for account in accounts]
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
            account_id_destination = check_account_exists_by_uid_cardnumber_currency(account.uid, account.card_number, currency_to_convert)
            
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