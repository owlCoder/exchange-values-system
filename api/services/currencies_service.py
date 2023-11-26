import os
import requests
from config.database import CURRENCY_API_URL
from services.caching_service import read_cached_data, write_cached_data, is_cache_valid

STATIC_FOLDER = "static"

def get_available_currencies(force_refresh=False):
    cached_file = os.path.join(STATIC_FOLDER, "available_currencies.json")

    if not force_refresh and is_cache_valid(cached_file):
        data = read_cached_data(cached_file)
        if data:
            return [currency["code"] for currency in data["currencies"]]

    data = requests.get(CURRENCY_API_URL + "/api/v1/currencies").json()
    write_cached_data(cached_file, data)

    return [currency["code"] for currency in data["currencies"]]


def get_available_currencies_course(force_refresh=False):
    cached_file = os.path.join(STATIC_FOLDER, "available_currencies_course.json")

    if not force_refresh and is_cache_valid(cached_file):
        data = read_cached_data(cached_file)
        if data:
            return {currency["code"]: currency for currency in data["currencies"]}

    data = requests.get(CURRENCY_API_URL + "/api/v1/currencies/today").json()
    write_cached_data(cached_file, data)

    return {currency["code"]: currency for currency in data["currencies"]}
