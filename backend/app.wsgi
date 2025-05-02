
import sys
import os

app_dir = '/home/roodanae/flaskapp'  
if app_dir not in sys.path:
    sys.path.insert(0, app_dir)

# Set environment variables
os.environ['FLASK_ENV'] = 'production'

# Import the Flask application
from app import app as application

# For debugging
import logging
logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)