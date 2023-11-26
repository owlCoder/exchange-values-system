import os
import json
from datetime import datetime, timedelta

STATIC_FOLDER = "static"
CACHE_TIME = 24  # Cache duration in hours


def read_cached_data(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            return json.load(file)
    return None


def write_cached_data(file_path, data):
    with open(file_path, "w") as file:
        json.dump(data, file)


def is_cache_valid(file_path):
    if os.path.exists(file_path):
        modified_time = os.path.getmtime(file_path)
        time_difference = datetime.now() - datetime.fromtimestamp(modified_time)
        return time_difference < timedelta(hours=CACHE_TIME)
    return False
