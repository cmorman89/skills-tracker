from flask import Blueprint, jsonify, request
from ..models import Category, db

# Define the blueprint for cateogires
categories_bp = Blueprint("cateogires", __name__, url_prefix="/api/v1/categories")


@categories_bp.route("/", methods=["GET"])
def get_categories():
    """Get all categories."""
    categories = Category.query.all()
    return jsonify([category.to_json() for category in categories])