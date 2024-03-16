FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Copy the Python application files into the container
COPY chat/ /app/
COPY requirements.txt /app/

# Copy the data folder into the container
COPY chat/static /app/static/
COPY chat/templates /app/templates/

# Install any dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your API will run on (adjust as needed)
EXPOSE 5000

# Define the command to run your API
CMD ["python3", "server.py"]