from flask import Blueprint

# Initialize the routes blueprint
routes_bp = Blueprint('routes', __name__)

# Import routes to register them with the blueprint
from .auth import *
from .resume import *
from .jobs import *
from .email import *
from .application import *