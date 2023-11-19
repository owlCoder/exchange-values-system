import hashlib

# Basic hash method to store hashed passwords
def hash_method(password):
    """
    Hashes the provided password using the SHA-256 algorithm.

    Args:
        password (str): The password to be hashed.

    Returns:
        str: The hashed password as a hexadecimal string.

    Example:
        hashed_password = hash_method("my_password123")
    """
    # Hash the password using SHA-256
    return hashlib.sha256(password.encode()).hexdigest()