import os

from flask import Flask, flash, render_template, redirect, request
from flask_session import Session

from models import db, Category, Skill, User, UserSkill
from config import Config

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)
# Initialize Session
Session(app)
# Initialize SQLAlchemy with app
db.init_app(app)

@app.route("/")
def index():
    return redirect("/skills")


@app.route("/skills")
def skills():
    """Display all skills."""
    skills = get_skills()
    categories = get_categories()
    print(skills)
    return render_template("skills.html", skills=skills, categories=categories)


@app.route("/skills/add", methods=["GET", "POST"])
def add_skill():
    """Add a new skill."""
    if request.method == "POST":
        skill_name = request.form.get("skill-name").lower()
        category_id = request.form.get("category-id")
        if skill_name and get_skills(name=skill_name) is None:
            if category_id and get_categories(id=category_id):
                new_skill = Skill(name=skill_name, category_id=category_id)
                db.session.add(new_skill)
                db.session.commit()
                flash(f"Skill {skill_name} added successfully!", "success")
            else:
                flash("Invalid category!", "danger")
        else:
            flash("Skill name is required!", "danger")
    return redirect("/skills")


@app.route("/skills/<int:id>/delete")
def delete_skill(id):
    """Delete a skill by ID."""
    skill = Skill.query.filter_by(id=id).first()
    if skill:
        db.session.delete(skill)
        db.session.commit()
        flash(f"Skill {skill.name} deleted successfully!", "success")
    else:
        flash("Skill not found!", "danger")
    return redirect("/skills")


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


def get_skills(id=None, name=None):
    """Get all skills or a specific skill by ID or name."""
    if id:
        return Skill.query.filter_by(id=id).first()
    elif name:
        return Skill.query.filter_by(name=name).first()
    return Skill.query.all()


def get_categories(id=None, name=None):
    """Get all categories or a specific category by ID or name."""
    if id:
        return Category.query.filter_by(id=id).first()
    elif name:
        return Category.query.filter_by(name=name).first()
    return Category.query.all()
