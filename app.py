from flask import Flask, flash, render_template, redirect, request
from flask_session import Session

from models import db, Category
from config import Config
from helpers import get_categories

from views.main import main_bp
from views.skills import skills_bp

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




@app.route("/categories")
def categories():
    """Display all categories."""
    categories = get_categories()
    return render_template("categories.html", categories=categories)


@app.route("/categories/add", methods=["POST"])
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


