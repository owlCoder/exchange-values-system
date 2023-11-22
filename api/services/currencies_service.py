import requests
import os
import json
from datetime import datetime, timedelta
from config.database import CURRENCY_API_URL

STATIC_FOLDER = 'static'
CACHE_TIME = 24  # Cache duration in hours

def GetAvailableCurrencies(force_refresh=False):
    """
    Retrieve a list of available currency codes from the currencies API.
    If cached data exists and within the cache duration, serve from the static folder.

    Args:
        force_refresh (bool): If True, forces refreshing data from the API.

    Returns:
        list: A list containing the currency codes available in the API.
    """
    cached_file = os.path.join(STATIC_FOLDER, 'available_currencies.json')

    if not force_refresh and os.path.exists(cached_file):
        modified_time = os.path.getmtime(cached_file)
        time_difference = datetime.now() - datetime.fromtimestamp(modified_time)
        if time_difference < timedelta(hours=CACHE_TIME):
            with open(cached_file, 'r') as file:
                data = json.load(file)
                return [currency['code'] for currency in data['currencies']]

    data = requests.get(CURRENCY_API_URL + '/api/v1/currencies').json()

    with open(cached_file, 'w') as file:
        json.dump(data, file)

    return [currency['code'] for currency in data['currencies']]

def GetAvailableCurrenciesCourse(force_refresh=False):
    """
    Retrieve a dictionary of available currencies with codes as keys and their details from the currencies API.
    If cached data exists and within the cache duration, serve from the static folder.

    Args:
        force_refresh (bool): If True, forces refreshing data from the API.

    Returns:
        dict: A dictionary where currency codes are keys, and the corresponding details are values.
    """
    cached_file = os.path.join(STATIC_FOLDER, 'available_currencies_course.json')

    if not force_refresh and os.path.exists(cached_file):
        modified_time = os.path.getmtime(cached_file)
        time_difference = datetime.now() - datetime.fromtimestamp(modified_time)
        if time_difference < timedelta(hours=CACHE_TIME):
            with open(cached_file, 'r') as file:
                data = json.load(file)

    data = requests.get(CURRENCY_API_URL + '/api/v1/currencies/today').json()

    with open(cached_file, 'w') as file:
        json.dump(data, file)

    return {currency['code']: currency for currency in data['currencies']}

def convert_currency(amount, from_currency, to_currency):
    """
    Converts an amount from one currency to another based on provided exchange rates.

    Args:
    - amount (float): The amount of money to convert.
    - from_currency (str): The currency code of the initial amount.
    - to_currency (str): The currency code to which the amount will be converted.

    Returns:
    - float: The converted amount in the target currency.
    """
    exchange_rates = GetAvailableCurrenciesCourse()

    # Ensure the exchange_rates structure is as expected
    if not isinstance(exchange_rates, dict):
        return -1

    # Get the exchange rates for the provided currencies
    from_rate_data = exchange_rates.get(from_currency)
    to_rate_data = exchange_rates.get(to_currency)

    # Extract course values and convert commas to dots
    from_rate = float(from_rate_data.get('course').replace(',', '.')) / float(from_rate_data.get('number'))
    to_rate = float(to_rate_data.get('course').replace(',', '.')) / float(to_rate_data.get('number'))

    # Convert the initial amount to RSD
    converted = from_rate * float(amount) / to_rate

    # Rounding the result to 4 decimal places
    return round(converted, 4)
