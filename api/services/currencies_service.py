import requests
from config.database import CURRENCY_API_URL

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

def convert_currency(amount, from_currency, to_currency):
    """
    Converts an amount from one currency to another based on provided exchange rates.

    Args:
    - amount (float): The amount of money to convert.
    - from_currency (str): The currency code of the initial amount.
    - to_currency (str): The currency code to which the amount will be converted.

    Returns:
    - float: The converted amount in the target currency.

    Example:
    ```python
    # Given exchange rates for certain currencies
    currencies = '{"currencies":[{"code":"RSD","number":"1","course":"1,000"},...]}'

    # Convert 100 LUF to ESP
    converted_amount = convert_currency(100, "LUF", "ESP")
    print(f"100 LUF is equal to approximately {converted_amount} ESP")
    ```
    """
    currencies = GetAvailableCurrenciesCourse()

    from_course = next(currency['course'] for currency in currencies if currency['code'] == from_currency)
    to_course = next(currency['course'] for currency in currencies if currency['code'] == to_currency)

    converted_amount = amount * float(from_course.replace(',', '.')) / float(to_course.replace(',', '.'))
    return converted_amount