import requests
from db_config import CURRENCY_API_URL

def GetAvailableCurrencies():
    """
    Retrieve a list of available currency codes from the currencies API.

    Returns:
        list: A list containing the currency codes available in the API.

    Usage:
        currencies = GetAvailableCurrencies()
    """
    data = requests.get(CURRENCY_API_URL + '/api/v1/currencies').json()
    return [currency['code'] for currency in data['currencies']]

def GetAvailableCurrenciesCourse():
    """
    Retrieve a dictionary of available currencies with codes as keys and their details (number and course) as values from the currencies API.

    Returns:
        dict: A dictionary where currency codes are keys, and the corresponding details are values.

    Usage:
        currencies_course = GetAvailableCurrenciesCourse()
        currencies_course['USD']['number']  # Accessing 'number' for USD currency
        currencies_course['EUR']['course']  # Accessing 'course' for EUR currency
    """
    data = requests.get(CURRENCY_API_URL + '/api/v1/currencies/today').json()
    return {currency['code']: currency for currency in data['currencies']}
