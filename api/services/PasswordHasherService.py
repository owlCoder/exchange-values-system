import hashlib

# Basic hash method to store hashed passwords
def hash_method(password):
    # Hash the password using SHA-256
    return hashlib.sha256(password.encode()).hexdigest()