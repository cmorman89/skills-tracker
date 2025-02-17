"""
Flask application entry point.
"""

from flask import Flask
from flask_session import Session

from models import db
from config import Config

from views.main import main_bp
from views.skills import skills_bp
from views.categories import categories_bp

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)
# Initialize Session
Session(app)
# Initialize SQLAlchemy with app
db.init_app(app)

# Blueprints
app.register_blueprint(main_bp)
app.register_blueprint(skills_bp)
app.register_blueprint(categories_bp)







