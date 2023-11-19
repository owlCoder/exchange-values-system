import uuid

def activation_message(email, password):
    """
    Generates an activation message for a new user.

    Args:
        email (str): The user's email address.
        password (str): The user's password.

    Returns:
        str: The activation message containing login details for the user.

    Example:
        activation_email = activation_message("example@example.com", "securepassword")
    """
    return f"""\
    Hello,

    Welcome to new era of transcations!

    Here are your login details:
    Email: {email}
    Password: {password}

    Best regards,
    Transactions System Support Team
    """

def transaction_message(amount, currency, account_number, flow, new_account_balance):
    """
    Generates a transaction message for a user's account.

    Args:
        amount (float): The amount transacted.
        currency (str): The currency of the transaction.
        account_number (str): The user's account number.
        flow (str): The direction of the transaction (e.g., 'In' or 'Out').
        new_account_balance (float): The new account balance after the transaction.

    Returns:
        str: The transaction message detailing the transaction information.

    Example:
        transaction_info = transaction_message(100.0, "USD", "1234567890", "In", 500.0)
    """
    return f"""\
    Dear user,

    {flow}flow: {amount} {currency} on your account {account_number}

    New account balance: {new_account_balance} {currency}
    Transaction ID: {uuid.uuid4()}

    Sincerely,
    Transactions System Team
    """