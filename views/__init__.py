"""
Flask App Initialization Module
"""

from flask import Blueprint

# Define blueprints for different views
main_bp = Blueprint("main", __name__)
skills_bp = Blueprint("skills", __name__, url_prefix="/skills")
categories_bp = Blueprint("categories", __name__, url_prefix="/categories")
projects_bp = Blueprint("projects", __name__, url_prefix="/projects")
