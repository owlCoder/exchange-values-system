import random

def generate_account_number():
    """
    Generates a random account number.

    This function generates a unique account number by combining a prefix from the provided list
    and a randomly generated sequence of digits.

    Returns:
        str: A randomly generated account number in the format "{prefix}-{random_digits}".
             Example: "170-1234567890123"
    """
    # Choose a prefix from the provided list
    prefixes = [170, 180, 182, 210, 225, 270, 299, 360, 365]
    prefix = str(random.choice(prefixes))

    # Generate 13 random digits
    digits = ''.join([str(random.randint(0, 9)) for _ in range(13)])

    # Combine the parts to form the account number
    account_number = f"{prefix}-{digits}"

    return account_number