import os

from datetime import datetime

from flask import Flask, flash, render_template, redirect, request
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy

# Create Flask app
app = Flask(__name__)
# Congifure Flask for SQLAlchemy
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"sqlite:///{os.path.join(basedir, 'skills.db')}"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

# Initialize Session
Session(app)
# Initialize SQLAlchemy
db = SQLAlchemy(app)


class Category(db.Model):
    __tablename__ = "categories"

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    def __repr__(self):
        return f"<Category {self.name}>"


class Skill(db.Model):
    __tablename__ = "skills"

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)

    # Relationships
    category = db.relationship("Category", backref="skills")
    user_skills = db.relationship(
        "UserSkill", back_populates="skill", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Skill {self.name}>"


class User(db.Model):
    __tablename__ = "users"

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    hash = db.Column(db.Text, nullable=False)

    # Relationships
    user_skills = db.relationship(
        "UserSkill", back_populates="user", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.username}>"


class UserSkill(db.Model):
    __tablename__ = "user_skills"

    # Fields
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey("skills.id"), nullable=False)
    date_added = db.Column(db.Date, nullable=False, default=datetime.now())
    source = db.Column(db.Text)
    application = db.Column(db.Text)
    mastery_level = db.Column(
        db.Integer, db.CheckConstraint("mastery_level >= 1 AND mastery_level <= 10")
    )
    category = db.Column(db.Text)

    # Relationships
    user = db.relationship("User", back_populates="user_skills")
    skill = db.relationship("Skill", back_populates="user_skills")

    def __repr__(self):
        return f"<UserSkill User={self.user_id} Skill={self.skill_id} Mastery={self.mastery_level}>"


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


def get_categories(id=None, name=None):
    """Get all categories or a specific category by ID or name."""
    if id:
        return Category.query.filter_by(id=id).first()
    elif name:
        return Category.query.filter_by(name=name).first()
    return Category.query.all()
    return Skill.query.all()
