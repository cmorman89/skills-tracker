"""
Category Blueprint Routes
"""

from flask import flash, redirect, render_template, request

from app import db
from helpers import get_categories
from models import Category

from . import categories_bp


@categories_bp.route("/")
def categories():
    """Display all categories."""
    categories = get_categories()
    return render_template("categories.html", categories=categories)


@categories_bp.route("/add", methods=["POST"])
def add_category():
    """Add a new category."""
    if request.method == "POST":
        category_name = request.form.get("category-name").lower()
        if category_name and get_categories(name=category_name) is None:
            new_category = Category(name=category_name)
            db.session.add(new_category)
            db.session.commit()
            flash(f"Category {category_name} added successfully!", "success")
        else:
            flash("Category name is required!", "danger")
    return redirect("/categories")
