import requests

CURRENCY_API_URL = 'https://currency-exchange-api-six.vercel.app/'

data = requests.get(CURRENCY_API_URL + '/api/v1/currencies/today').json()
nov = {currency['code']: currency for currency in data['currencies']}
print(nov['USD'])