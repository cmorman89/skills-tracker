"""
Flask App Initialization Module
"""

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import Config

# CORS Origins
CORS_ORIGINS = [
    "http://localhost:5173", "http://127.0.0.1:5173"
]

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
    app.register_blueprint(skills_bp, url_prefix="/api/v1/skills")
    # Enable CORS
    CORS(app, origins=CORS_ORIGINS)
    return app