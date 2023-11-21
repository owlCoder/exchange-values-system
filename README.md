# Transaction Systems API

This API is a transaction system that allows users to perform various operations related to accounts, credit cards, authentication, and user management.

## Overview

The Transaction Systems API offers the following main functionalities:

- **Accounts:** Top-up account balances, fetch accounts by credit card, etc.
- **Authentication:** Authenticate users, sign users out, etc.
- **Credit Cards:** Check, create, update credit card details, etc.
- **Currencies:** Retrieve available currency codes and detailed information.
- **Token:** Check token validity, delete tokens, etc.
- **User:** Create users, retrieve user details, update user information, etc.

## Getting Started

To use API, follow the guidelines below:

### Base URL

The base URL for this API is `https://api.transactionsystem.com`.

### Authentication

Some endpoints require authentication. You need to authenticate by providing the user's email and password via the `/api/auth0/` endpoint.

### Error Handling

- **400:** Bad Request - Invalid data provided.
- **401:** Unauthorized - Authentication failure or invalid token.
- **403:** Forbidden - Insufficient permissions.
- **404:** Not Found - Resource not found.
- **500:** Internal Server Error - Unexpected errors occurred.

## Endpoints

## Authentication Endpoints

### Authenticate User (POST /api/auth0/)

Authenticate a user using email and password.

Request body:
```json
{
  "email": "user@example.com",
  "password": "user_password"
}
```

- **Success Response (200)**: User authenticated successfully.

### Sign Out User (POST /api/auth0/logout/)
Sign out a user and remove their token.

Request body:

```json
{
  "token": "user_token",
  "uid": "user_id"
}
```

- **Success Response (200)**: User signed out successfully.


Certainly! Here are the account-related endpoints formatted in Markdown:

## Account Endpoints

### Top Up Account (POST /api/account/topup)

Top up the balance of a current account or create a new account if it does not exist.

Request body:
```json
{
  "amount": 100.0,
  "card_number": "card_number_here",
  "currency": "USD",
  "uid": 12345
}
```

- **Success Response (201):** Account balance has been topped up.
- **Error Response (400):** Please provide valid data.
- **Error Response (500):** Account balance hasn't been changed.

### Get Accounts by Card Number (POST /api/accounts/getAccountsByCard)

Fetch all accounts associated with a specified credit card number.

Request body:
```json
{
  "card_number": "card_number_here"
}
```

- **Success Response (200):** Serialized list of accounts associated with the provided card number.
- **Success Response (204):** No current accounts.
- **Error Response (500):** Error occurred while fetching accounts.

## Credit Cards

### Check Credit Card by User ID (POST /api/cards/checkByUid)

Check if the user has at least one credit card in the database.

Request body:
```json
{
  "uid": "user_id"
}
```

- **Success Response (200):** Exists.
- **Error Response (401):** Credit card info doesn't exist. Check entered information.

### Create Credit Card (POST /api/cards/create)

Create a new credit card with user-provided information.

Request body:
```json
{
  "example_field": "Example description of a field"
}
```

- **Success Response (200):** Credit card info saved successfully.
- **Error Response (401):** Credit card info couldn't be saved. Check entered information.

### Get Credit Cards By User ID (POST /api/cards/getCardsByUid)

Retrieve all credit cards owned by a user with a specific UID.

Request body:
```json
{
  "uid": "user_id"
}
```

- **Success Response (200):** List of credit card details.
- **Error Response (500):** Error retrieving credit cards by uid.

### Update Verified Status (PUT /api/cards/updateVerified)

Update the "verified" field by card number.

Request body:
```json
{
  "card_number": "1234567890123456",
  "uid": "user_id",
  "verified": true
}
```

- **Success Response (200):** Verified status updated successfully.
- **Error Response (403):** Error updating verified status.

