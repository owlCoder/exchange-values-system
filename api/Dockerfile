# Use a base image with Python
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file and install dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the files from the current directory to the container
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "index.py"]