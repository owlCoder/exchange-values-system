from functools import wraps

def exclude_docstring(func):
    """
    Decorator to exclude the docstring from Swagger documentation.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    wrapper.__doc__ = None  # Set docstring to None to exclude it
    return wrapper