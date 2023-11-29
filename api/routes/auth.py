from http import HTTPStatus
from services.password_hasher import hash_method
from services.auth_service import auth_user, unauth_user

def login(request):
    if request.method == 'POST':
        credentials = request.json  # Vercel uses request.json directly
        email = credentials.get('email')
        password_hash = hash_method(credentials.get('password'))
        response = auth_user(email, password_hash)

        return {
            'status': HTTPStatus.OK,
            'body': response  # Ensure response is in the format that Vercel expects
        }

    return {
        'status': HTTPStatus.METHOD_NOT_ALLOWED,
        'body': 'Only POST method is allowed for this route'
    }

def logout(request):
    if request.method == 'POST':
        credentials = request.json
        uid = credentials.get('uid')
        token = credentials.get('token')

        return {
            'status': HTTPStatus.OK,
            'body': unauth_user(uid, token)  # Ensure response format for Vercel
        }

    return {
        'status': HTTPStatus.METHOD_NOT_ALLOWED,
        'body': 'Only POST method is allowed for this route'
    }
