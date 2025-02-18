"""
Flask App Initialization Module
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    # Create Flask app
    app = Flask(__name__)
    # Configure the app with settings from Config class
    app.config.from_object(Config)
    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    # Register Blueprints
    from .routes import skills_bp
    app.register_blueprint(skills_bp, url_prefix="/skills")

    return app