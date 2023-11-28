import uuid

def activation_message(email, password):
    return f"""\
    Welcome to new era of transcations!

    Here are your login details:
    Email: {email}
    Password: {password}

    Best regards,
    Transactions System Support Team
    """

def transaction_message(amount, currency, account_number, flow, new_account_balance):
    return f"""\
    Regards,

    {flow}flow: {amount} {currency} on your account {account_number}

    New account balance: {new_account_balance} {currency}
    Transaction ID: {uuid.uuid4()}

    Sincerely,
    Transactions System Team
    """