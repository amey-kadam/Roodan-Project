import sys
import os

# Get the current directory
INTERP = os.path.join(os.environ['HOME'], 'python')
if sys.executable != INTERP and os.path.exists(INTERP):
    os.execl(INTERP, INTERP, *sys.argv)

# Add the application directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

# Import the Flask application instance
from app import app as application