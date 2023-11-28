# Use a slim Python image as the base
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy just the requirements file and install dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port Gunicorn will listen on
EXPOSE 5000

# Command to run the Flask application using Gunicorn with eventlet worker
# Add gunicron & eventlet in requiremens.txt to run in production
CMD ["gunicorn", "-w", "4", "-k", "eventlet", "-b", "0.0.0.0:5000", "index:app"]