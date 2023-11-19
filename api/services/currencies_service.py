import requests
from db_config import CURRENCY_API_URL

# Get all available currencies from currencies API
def GetAvailableCurrencies():
    data =  requests.get(CURRENCY_API_URL + '/api/v1/currencies').json()

    return [currency['code'] for currency in data['currencies']]