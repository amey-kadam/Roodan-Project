import sys, os

# Set the path to your Python virtual environment
VENV_PATH = os.path.join(os.getcwd(), 'venv')
INTERP = os.path.join(VENV_PATH, 'bin', 'python')
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

# Add the current directory to the path
sys.path.append(os.getcwd())

# Import your application as application
from app import app as application

# If using a different name for your Flask app, adjust accordingly
# For example, if your app is created as:
# flask_app = Flask(__name__)
# Then use:
# from your_file import flask_app as application