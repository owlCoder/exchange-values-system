import uuid

def generate_token():
    # Generate a random UUID4
    new_token = uuid.uuid4()

    # Convert the UUID to a string without dashes
    token= str(new_token).replace('-', '')

    return token